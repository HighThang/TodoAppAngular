import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { EIcon } from 'src/app/shared/components/icon/icon.enum';
import { ETodoStatus } from './todo-header.enum';
import { Subject, takeUntil } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../todo.model';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit, OnDestroy {
  @Output() addTodo = new EventEmitter<Todo>();
  @Output() filterChange = new EventEmitter<ETodoStatus>();

  ETodoStatus = ETodoStatus;
  EIcon = EIcon;

  todoStatuses = [
    { label: 'All', value: ETodoStatus.All, key: 'all' },
    { label: 'Pending', value: ETodoStatus.Pending, key: 'pending' },
    { label: 'Active', value: ETodoStatus.Active, key: 'active' },
    { label: 'Completed', value: ETodoStatus.Completed, key: 'completed' },
    { label: 'Failed', value: ETodoStatus.Failed, key: 'failed' }
  ];

  count: { [key: string]: number } = {
    all: 0,
    pending: 0,
    active: 0,
    completed: 0,
    failed: 0
  };

  private destroy$ = new Subject<void>();

  constructor(private todoService: TodoService, private dialogService: DialogService) { }

  ngOnInit() {
    this.todoService.countTodos().pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.count = res;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDialog() {
    this.addTodo.emit();
    this.dialogService.open({
      title: 'Add Todo',
      onConfirm: () => { },
      onCancel: () => { }
    });
  }

  setFilter(filter: ETodoStatus) {
    this.filterChange.emit(filter);
  }
}