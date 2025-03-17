import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { TasksButtonsComponent } from './components/tasks-buttons/tasks-buttons.component';

@NgModule({
  declarations: [ HeaderComponent, ShortenPipe, AutoFocusDirective, TasksButtonsComponent ],
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  exports: [ HeaderComponent, ShortenPipe, AutoFocusDirective, TasksButtonsComponent ]
})
export class SharedModule { }
