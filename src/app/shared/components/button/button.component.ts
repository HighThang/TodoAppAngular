import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: ButtonTypes = 'primary';
  @Input() size: ButtonSizes = 'medium';
  @Input() disable: boolean = false;
  @Input() lable: string = '';

  constructor() { }
}

export type ButtonTypes = 'primary' | 'danger' | 'success' | 'warning';
export type ButtonSizes = 'medium' | 'small' | 'large';
