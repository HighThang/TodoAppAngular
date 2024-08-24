import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from './toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<Omit<Toast, 'id'>>();
  toastState = this.toastSubject.asObservable();

  show(title: string, message: string, type: Toast['type']) {
    this.toastSubject.next({ title, message, type });
  }
}
