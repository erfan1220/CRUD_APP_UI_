import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-phone',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './input-phone.component.html',
  styleUrl: './input-phone.component.css',
})
export class InputPhoneComponent {
  @Input() control!: FormControl;
  @Output() phoneChange = new EventEmitter<{ event: Event; index: number }>();

  onInput(event: Event) {
    this.phoneChange.emit({ event, index: 2 });
  }

  
  onlyNumber(event: KeyboardEvent) {
    const allowedkeys = ['Enter', 'Backespace'];
    const charCode = event.key;
    if (!/^[0-9]$/.test(charCode) && !allowedkeys.includes(charCode)) {
      event.preventDefault();
    }
  }
}
