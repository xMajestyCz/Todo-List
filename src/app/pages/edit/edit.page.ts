import { Component, OnInit } from '@angular/core';
import { Task, TaskDescription } from '../../core/models/task.models';
import { FirestoreService } from '../../task/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: false
})
export class EditPage implements OnInit {
  task: Task;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.firestoreService.getDocumentById<Task>('Tasks', id).subscribe(data => {
        if (data) {
          this.task = data;
        }
        this.updateTaskDoneStatus();
      });
    }
  }

  updateTask() {
    if (this.task) {
      this.firestoreService.updateDocumentWithId(this.task, 'Tasks', this.task.id);
    }
  }

  updateTaskDoneStatus() {
    this.task.done = this.task.descriptions.every(desc => desc.done);
  }

  trackByIndex(index: number): number {
    return index;
  }

  removeDescription(index: number) {
    this.task.descriptions.splice(index, 1);
    this.firestoreService.updateDocumentWithId(this.task, 'Tasks', this.task.id);
  }

  addDescription() {
    const newDesc: TaskDescription = { text: '', done: false };
    this.task.descriptions = [...this.task.descriptions, newDesc];
  }

  save() {
    if (!this.task.title.trim()) {
      this.toastService.show("The title cannot be empty.", 'danger');
      return;
    }
    this.firestoreService.updateDocumentWithId(this.task, 'Tasks', this.task.id);
    this.toastService.show('Task saved successfully.', 'primary');
  }

  async deleteTask() {
    await this.firestoreService.deleteDocumentWithId('Tasks', this.task.id);
    this.toastService.show('Task deleted.', 'danger');
    this.router.navigate(['/home']);
  }

  presentDeleteAlert() {
    this.alertService.presentConfirmAlert({
      header: 'Are you sure?',
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: () => this.deleteTask()
    });
  }
}
