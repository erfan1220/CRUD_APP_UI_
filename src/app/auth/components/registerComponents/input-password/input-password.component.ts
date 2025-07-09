import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-input-password',
  imports: [CommonModule, MatIcon,ReactiveFormsModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.css',
})
export class InputPasswordComponent {
  @Input() control!: FormControl;
  showPassword: boolean = false;

  @Output() passwordChange = new EventEmitter<{ event: Event; index: number }>();

  onInput(event: Event) {
    this.passwordChange.emit({ event, index: 1 });
  }

  togglepass() {
    this.showPassword = !this.showPassword;
  }
}
