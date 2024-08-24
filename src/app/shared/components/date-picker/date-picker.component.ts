import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor {
  selectedDateTime: string = '';

  private onChange: (value: Date) => void = () => { };
  private onTouched: () => void = () => { };

  private toLocalDateTimeString(date: Date): string {
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 16);
  }

  onDateTimeChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedDateTime = inputElement.value;
    this.emitDateChange();
  }

  emitDateChange() {
    if (this.selectedDateTime) {
      const newDate = new Date(this.selectedDateTime);
      this.onChange(newDate);
    }
  }

  writeValue(value: Date): void {
    if (value) {
      this.selectedDateTime = this.toLocalDateTimeString(value);
    } else {
      this.selectedDateTime = '';
    }
  }

  registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onBlur() {
    this.onTouched();
  }

  get datePickerClass(): string {
    return this.selectedDateTime ? 'datetimepicker filled' : 'datetimepicker empty';
  }
}
