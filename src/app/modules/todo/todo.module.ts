import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from 'src/app/modules/todo/components/todo-list/todo-list.component';
import { TodoFormComponent } from 'src/app/modules/todo/components/todo-form/todo-form.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoComponent } from './todo.component';
import { TodoService } from './services/todo.service';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    TodoFormComponent,
    TodoHeaderComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    TodoListComponent,
    TodoFormComponent,
    TodoHeaderComponent,
    TodoItemComponent,
    TodoComponent
  ],
  providers:[TodoService, ApiService],
})
export class TodoModule {}
