import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogData } from './dialog.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogSubject = new Subject<DialogData>();
  dialogState$ = this.dialogSubject.asObservable();

  confirm(data: DialogData) {
    this.dialogSubject.next({
      ...data,
      isConfirmDialog: true
    });
  }

  open(data: DialogData) {
    this.dialogSubject.next({
      ...data,
      isConfirmDialog: false
    });
  }
}
