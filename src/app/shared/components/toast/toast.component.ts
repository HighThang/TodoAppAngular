import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Toast } from './toast.model';
import { ToastService } from './toast.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private destroy$ = new Subject<void>();

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toastState.pipe(takeUntil(this.destroy$)).subscribe((toast: Omit<Toast, 'id'>) => {
      const id = Date.now();
      this.toasts.push({ id, ...toast });
      setTimeout(() => this.triggerSlideOut(id), 3000); 
    });
  }

  triggerSlideOut(id: number) {
    const toastElement = document.getElementById(`toast-${id}`);
    if (toastElement) {
      toastElement.classList.add('slide-out');
      setTimeout(() => this.removeToast(id), 500);
    } else {
      this.removeToast(id);
    }
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
