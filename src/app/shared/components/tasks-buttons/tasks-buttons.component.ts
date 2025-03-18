import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tasks-buttons',
  templateUrl: './tasks-buttons.component.html',
  styleUrls: ['./tasks-buttons.component.scss'],
  standalone: false
})
export class TasksButtonsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() isEditMode: boolean = false;
  @Input() date!: Date | string;
  @Output() dateChange = new EventEmitter<Date>();
  @Output() addDescriptionClicked = new EventEmitter<void>();
  @Output() saveClicked = new EventEmitter<void>();

  onDateChange(event: any) {
    const isoString = event.detail?.value;
  this.dateChange.emit(isoString);         
  }

  triggerAddDescription() {
    this.addDescriptionClicked.emit();
  }

  triggerSave() {
    this.saveClicked.emit();
  } 
}
