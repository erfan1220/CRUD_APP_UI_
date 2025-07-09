import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-toast',
  imports: [CommonModule],
  templateUrl: './error-toast.component.html',
  styleUrl: './error-toast.component.css',
})
export class ErrorToastComponent {
  @Input() show = false;
  @Input() error_text = '';
}
