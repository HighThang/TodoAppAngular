import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, debounceTime, switchMap, tap } from 'rxjs';
import { TodoService } from './services/todo.service';
import { Todo } from './todo.model';
import { ETodoStatus } from './components/todo-header/todo-header.enum';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  filteredTodos: Todo[] = [];
  private subscriptions: Subscription = new Subscription();
  loading: boolean = false;

  isFormDialogVisible: boolean = false;
  isEdited: boolean = false;
  selectedTodo!: Todo;

  constructor(
    private todoService: TodoService,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.todoService.loadTodos().subscribe();

    this.subscriptions.add(
      combineLatest([
        this.todoService.todos$,
        this.todoService.filter$,
        this.todoService.searchQuery$,
      ]).pipe(
        debounceTime(300),
        tap(() => (this.loading = true)),
        switchMap(([, filter, searchQuery]) => { 
          return this.apiService.searchTodos(searchQuery, filter); 
        })
      ).subscribe({
        next: (res) => {
          this.filteredTodos = res;
          this.loading = false; 
        }, error: () => { this.loading = false; }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  filterTodos(status: ETodoStatus) {
    this.todoService.setFilter(status);
  }

  onSearch(query: string) {
    this.todoService.setSearchQuery(query);
  }

  showAddForm() {
    this.selectedTodo = {} as Todo;        
    this.isFormDialogVisible = true;
  }

  showEditForm(todo: Todo) {
    this.selectedTodo = todo;
    this.isFormDialogVisible = true;
  }

  closeForm() {
    this.isFormDialogVisible = false;
    this.selectedTodo = {} as Todo;
  }
}
