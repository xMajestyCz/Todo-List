import { Component, OnInit } from '@angular/core';
import { Task } from '../../core/models/task.models';
import { FirestoreService } from '../../task/services/task.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: false
})
export class AddPage implements OnInit {
  tasks: Task[] = [];
  newTask: Task;
  loading: boolean = false;

  constructor(private firestoreService: FirestoreService, private toastController: ToastController) { 
    this.initTask();
  }

  ngOnInit() {
  }

  initTask() {
    this.newTask = {
      title: '',
      descriptions: [],
      date: null,
      done: false,
      id: this.firestoreService.createIdDoc(),
    };
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'primary'
    });
    await toast.present();
  }

  addDescription() {
    this.newTask.descriptions = [
      ...this.newTask.descriptions, 
      { text: '', done: false }
    ];
  }

  async save() {
    if (!this.newTask.title.trim()) {
      this.showToast("The title cannot be empty.");
      return;
    }
    this.newTask.descriptions = this.newTask.descriptions.filter(desc => desc.text.trim() !== '');
    await this.firestoreService.createDocumentWithId(this.newTask, 'Tasks', this.newTask.id);
    this.showToast('Task saved successfully.');
    this.initTask();
  }
  
  trackByIndex(index: number, obj: any): any {
    return index;
  }

  removeDescription(index: number) {
    this.newTask.descriptions.splice(index, 1);
  }
}
