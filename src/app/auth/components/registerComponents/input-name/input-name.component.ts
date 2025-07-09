import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input-name',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-name.component.html',
  styleUrl: './input-name.component.css',
})
export class InputNameComponent {
  @Input() control!: FormControl;

  @Output() inputChange = new EventEmitter<{ event: Event; index: number }>();

  onInput(event: Event) {
    this.inputChange.emit({ event, index: 0 });
  }
}
