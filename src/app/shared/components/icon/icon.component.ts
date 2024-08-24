import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EIcon } from './icon.enum';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnChanges {
  @Input() type: EIcon = EIcon.Edit;
  iconPath: string = '';

  private onChange: (value: string) => void = () => {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) {
      this.setIcon(this.type);
    }
  }

  setIcon(type: EIcon) {
    switch (type) {
    case EIcon.Edit:
      this.iconPath = 'assets/icons/edit.svg';
      break;
    case EIcon.Delete:
      this.iconPath = 'assets/icons/delete.svg';
      break;
    case EIcon.Add:
      this.iconPath = 'assets/icons/add.svg';
      break;
    case EIcon.Check:
      this.iconPath = 'assets/icons/check.svg';
      break;
    case EIcon.Search:
      this.iconPath = 'assets/icons/search.svg';
      break;
    default:
      this.iconPath = 'assets/icons/edit.svg';
    }
    this.onChange(type);
  }
}
