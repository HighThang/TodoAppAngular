import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ETodoStatus } from '../todo-header/todo-header.enum';
import { Todo } from '../../todo.model';
import { EIcon } from 'src/app/shared/components/icon/icon.enum';
import { timer, Subscription } from 'rxjs';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { DialogService } from 'src/app/shared/components/dialog/dialog.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, OnDestroy {
  @Input() todo!: Todo;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Todo>();

  EIcon = EIcon;
  ETodoStatus = ETodoStatus;
  progress: number = 100;
  remainingTime: string = '';
  checkProgress: boolean = false;
  timerSubscription: Subscription | undefined;

  constructor(
    private todoService: TodoService, 
    private toastService: ToastService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.updateProgress();
    this.timerSubscription = timer(0, 10000).subscribe(() => {
      this.updateProgress();
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  updateProgress() {
    const now = new Date().getTime();
    const start = new Date(this.todo.startDate).getTime();
    const end = new Date(this.todo.endDate).getTime();
    const total = end - start;
    const remaining = end - now;

    switch (this.todo.status) {
    case ETodoStatus.Pending:
      this.progress = 0;
      this.remainingTime = this.formatRemainingTime(total);

      if (now >= start && now < end) {
        this.todo.status = ETodoStatus.Active;
        this.todoService.updateTodo(this.todo.id, this.todo).subscribe();
        this.progress = Math.max(0, Math.min(100, (remaining / total) * 100));
        this.remainingTime = this.formatRemainingTime(remaining);
        this.toastService.show('Note', 'Todo is active now!', 'primary');
      } else if (now >= end) {
        this.progress = 0;
        this.todo.status = ETodoStatus.Failed;
        this.todoService.updateTodo(this.todo.id, this.todo).subscribe();
        this.stopTimer();
        this.toastService.show('Failed', 'Todo failed!', 'danger');
      }
      break;

    case ETodoStatus.Active:
      this.progress = Math.max(0, Math.min(100, (remaining / total) * 100));
      this.remainingTime = this.formatRemainingTime(remaining);

      if (this.progress > 20) {
        this.checkProgress = true;
      } else if (this.progress <= 20 && this.checkProgress === true) {
        this.toastService.show('Warning', 'Todo almost over!', 'warning');
        this.checkProgress = false;
      }

      if (now >= end) {
        this.progress = 0;
        this.todo.status = ETodoStatus.Failed;
        this.todoService.updateTodo(this.todo.id, this.todo).subscribe();
        this.stopTimer();
        this.toastService.show('Failed', 'Todo failed!', 'danger');
      }
      break;

    case ETodoStatus.Failed:
      this.progress = 0;
      break;

    default:
      this.progress = 100;
      break;
    }
  }

  formatRemainingTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m`;
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription = undefined;
    }
  }

  onMarkAsCompleted(id: string) {
    this.todoService.markAsCompleted(id).subscribe(() => {
      this.todo.status = ETodoStatus.Completed;
      this.toastService.show('Success', 'Todo completed!', 'success');
    });
  }

  onEdit(todo: Todo) {
    this.edit.emit(todo);
    this.dialogService.open({
      title: 'Edit Todo',
      onConfirm: () => { },
      onCancel: () => { }
    });
  }

  onDelete(id: string) {
    this.dialogService.confirm({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this todo?',
      isConfirmDialog: false,
      onConfirm: () => {        
        this.todoService.deleteTodo(id).subscribe((res) => {
          if (res) {
            this.toastService.show('Success', 'Delete successfully!', 'success');
          } else {
            this.toastService.show('Error', 'Delete unsuccessfully.', 'danger');
          }
        });
      },
      onCancel: () => { }
    });
  }
}