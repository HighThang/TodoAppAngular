import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Todo } from '../todo.model';
import { ETodoStatus } from '../components/todo-header/todo-header.enum';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  private apiUrl = environment.default;
  
  constructor(private http: HttpClient) {}

  searchTodos(query: string, filter: ETodoStatus): Observable<Todo[]> {  
    return this.http.get<Todo[]>(`${this.apiUrl}`, {
      params: {
        name: query,
        status: filter.toString()
      }
    }).pipe(
      map(todos => this.sortTodos(todos)),
      catchError(() => {
        return of([]);
      })
    );
  }

  sortTodos(todos: Todo[]): Todo[] {
    const statusOrder = {
      [ETodoStatus.Active]: 1,
      [ETodoStatus.Pending]: 2,
      [ETodoStatus.Completed]: 3,
      [ETodoStatus.Failed]: 4,
      [ETodoStatus.All]: 0
    };

    return todos.sort((a, b) => {
      const statusDiff = (statusOrder[a.status] || 5) - (statusOrder[b.status] || 5);

      if (statusDiff !== 0) {
        return statusDiff;
      }

      const remainingA = new Date(a.endDate).getTime() - Date.now();
      const remainingB = new Date(b.endDate).getTime() - Date.now();
      return remainingA - remainingB;
    });
  }
}
