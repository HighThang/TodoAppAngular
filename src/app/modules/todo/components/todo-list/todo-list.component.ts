import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() searchQueryChange = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>();
  
  selectedTodo!: Todo;
  isDialogVisible: boolean = false;
  searchQuery: string = '';

  constructor() { }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.searchQueryChange.emit(this.searchQuery);
  }

  trackByTodo(_index: number, todo: Todo): string {
    return todo.status;
  }

  onEdit(todo: Todo) {
    this.edit.emit(todo);
  }
}