import { NgModule } from '@angular/core';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { DatepickerComponent } from './components/date-picker/date-picker.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { IconComponent } from './components/icon/icon.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  imports: [
    InputComponent,
    ButtonComponent,
    DatepickerComponent,
    RadioButtonComponent,
    DialogComponent,
    IconComponent,
    ToastComponent,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    DatepickerComponent,
    RadioButtonComponent,
    DialogComponent,
    IconComponent,
    ToastComponent,
  ],
  declarations: []
})
export class SharedModule {}
