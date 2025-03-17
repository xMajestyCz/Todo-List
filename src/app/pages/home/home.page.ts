import { Component, Input } from '@angular/core';
import { Task } from '../../core/models/task.models';
import { FirestoreService } from '../../core/services/firestore.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  @Input() public dateNotNull: boolean = true;
  tasks: Task[] = [];
  newTask: Task;
  cargando: boolean = false;
  searchTask: string = '';
  allTasks: Task[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private alertService: AlertService
  ) {
    this.loadTasks();
  }

  loadTasks() {
    this.firestoreService.getCollectionChanges<Task>('Tasks').subscribe(data => {
      if (data) {
        const tasksWithDateFixed = data.map(task => {
          if ((task.date as any)?.toDate) {
            task.date = (task.date as any).toDate();
          }
          return task;
        });
  
        this.allTasks = tasksWithDateFixed;
        this.tasks = [...tasksWithDateFixed];
      }
    });
  }
  

  filterTask() {
    const query = this.searchTask.trim().toLowerCase();
    if (!query) {
      this.tasks = [...this.allTasks];
      return;
    }

    this.tasks = this.allTasks.filter(task => {
      const titleMatch = task.title?.toLowerCase().includes(query);
      const descriptionMatch = task.descriptions?.some(desc =>
        desc.text.toLowerCase().includes(query)
      );
      return titleMatch || descriptionMatch;
    });
  }

  async toggleDone(task: Task) {
    const newStatus = task.done;
    task.descriptions = task.descriptions.map(desc => ({
      ...desc,
      done: newStatus
    }));
    await this.firestoreService.updateDocumentWithId(task, 'Tasks', task.id);
  }

  async delete(task: Task) {
    this.cargando = true;
    await this.firestoreService.deleteDocumentWithId('Tasks', task.id);
    this.cargando = false;
  }

  trackByIndex(index: number): number {
    return index;
  }

  presentDeleteAlert(task: Task) {
    this.alertService.presentConfirmAlert({
      header: 'Are you sure?',
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: () => this.delete(task)
    });
  }
}
