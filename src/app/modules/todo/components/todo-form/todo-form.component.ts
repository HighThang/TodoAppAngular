import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { ETodoStatus } from '../todo-header/todo-header.enum';
import { Todo } from '../../todo.model';
import { ToastService } from 'src/app/shared/components/toast/toast.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() todo!: Todo;
  @Output() closed = new EventEmitter<void>();

  ETodoStatus = ETodoStatus;
  todoForm: FormGroup;
  showErrors: boolean = false;
  dialogTitle: string = 'Add Todo';

  constructor(private fb: FormBuilder, private todoService: TodoService, private toastService: ToastService) {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, {
      validators: [
        this.dateComparisonValidator('startDate', 'endDate')
      ]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['todo'] && this.todo) {     
      this.dialogTitle = 'Edit Todo';
      const startDate = new Date(this.todo.startDate);
      const endDate = new Date(this.todo.endDate);    
      if (Object.keys(this.todo).length > 0) {
        this.todoForm.patchValue({
          name: this.todo.name,
          startDate: isNaN(startDate.getTime()) ? null : startDate,
          endDate: isNaN(endDate.getTime()) ? null : endDate,
          status: this.todo.status
        });
      } 
      else {
        this.dialogTitle = 'Add Todo';
        this.todoForm.patchValue({
          name: '',
          startDate: '',
          endDate: '',
          status: ''
        });
      }
    }
  }

  private dateComparisonValidator(startField: string, endField: string) {
    return (group: FormGroup): { [key: string]: boolean } | null => {
      const startDate = group.get(startField)?.value;
      const endDate = group.get(endField)?.value;

      if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
        return { dateComparison: true };
      }
      return null;
    };
  }

  private calculateStatus(startDate: string, endDate: string): ETodoStatus {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > now) {
      return ETodoStatus.Pending;
    } else if (start <= now && end > now) {
      return ETodoStatus.Active;
    } else {
      return ETodoStatus.Failed;
    }
  }

  onSubmit() {
    if (this.todoForm.valid) {      
      const formValue = this.todoForm.value;
      const status = this.calculateStatus(formValue.startDate, formValue.endDate);

      const todoData = {
        ...formValue,
        status: status
      };

      if (this.todo && Object.keys(this.todo).length > 0) {        
        this.todoService.updateTodo(this.todo.id, todoData).subscribe(() => {
          this.toastService.show('Success', 'Edit Todo successfully!', 'success');
        });
      } else {
        this.todoService.addTodo(todoData).subscribe(() => {
          this.toastService.show('Success', 'Add Todo successfully!', 'success');
        });
      }
      this.closed.emit();
      this.showErrors = false;
    }
    else this.showErrors = true;
  }

  onCloseDialog() {
    this.closed.emit();
  }
}
