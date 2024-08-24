import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  @Input() title: string = '';
  @Input() isVisible: boolean = false;
  @Output() closed = new EventEmitter<void>();
  @Input() width: string = 'auto';
  @Input() isConfirmDialog: boolean = false;
  message: string = '';
  
  private onConfirm: () => void = () => {};
  private onCancel: () => void = () => {};

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    this.dialogService.dialogState$.subscribe(data => {
      this.title = data.title;
      this.message = data.message ?? '';
      this.onConfirm = data.onConfirm;
      this.onCancel = data.onCancel;
      this.isVisible = true;
      this.isConfirmDialog = data.isConfirmDialog ?? false;
    });
  }

  confirm() {
    this.onConfirm();
    this.isVisible = false;
    this.closed.emit();
  }

  cancel() {
    this.onCancel();
    this.isVisible = false;
    this.closed.emit();
  }

  onClose() {
    this.isVisible = false;
    this.closed.emit();
  }
}
