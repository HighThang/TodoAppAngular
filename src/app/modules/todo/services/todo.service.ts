import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { Todo } from '../todo.model';
import { ETodoStatus } from '../components/todo-header/todo-header.enum';
import { environment } from 'src/environments/environment';

@Injectable()
export class TodoService {
  private todosSubject$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject$.asObservable();
  private filterSubject$ = new BehaviorSubject<ETodoStatus>(ETodoStatus.All);
  filter$ = this.filterSubject$.asObservable();
  private searchQuerySubject$ = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject$.asObservable();

  private apiUrl = environment.default;

  constructor(private http: HttpClient) { }

  loadTodos() {
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      tap(todos => this.todosSubject$.next(todos))
    );
  }

  private fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      tap(todos => {
        this.todosSubject$.next(todos);
      })
    );
  }

  setFilter(filter: ETodoStatus) {
    this.filterSubject$.next(filter);
  }

  setSearchQuery(query: string) {
    this.searchQuerySubject$.next(query);
  }

  addTodo(todo: { name: string, startDate: string, endDate: string }): Observable<Todo[]> {
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      switchMap(() => this.fetchTodos())
    );
  }

  updateTodo(id: string, todo: { name: string, startDate: string, endDate: string, status: string }): Observable<Todo[]> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, todo).pipe(
      switchMap(() => this.fetchTodos())
    );
  }

  deleteTodo(id: string): Observable<Todo[]> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      switchMap(() => this.fetchTodos())
    );
  }

  markAsCompleted(id: string): Observable<Todo[]> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, { status: ETodoStatus.Completed }).pipe(
      switchMap(() => this.fetchTodos())
    );
  }

  countTodos(): Observable<{ all: number, pending: number, active: number, completed: number, failed: number }> {
    return this.todos$.pipe(
      map(todoList => {
        const todoCount = {
          all: todoList.length,
          pending: 0,
          active: 0,
          completed: 0,
          failed: 0
        };

        todoList.forEach(todo => {
          switch (todo.status) {
          case ETodoStatus.Pending:
            todoCount.pending++;
            break;
          case ETodoStatus.Active:
            todoCount.active++;
            break;
          case ETodoStatus.Completed:
            todoCount.completed++;
            break;
          case ETodoStatus.Failed:
            todoCount.failed++;
            break;
          }
        });

        return todoCount;
      })
    );
  }
}