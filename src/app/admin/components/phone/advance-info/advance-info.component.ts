import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-advance-info',
  imports: [CommonModule],
  templateUrl: './advance-info.component.html',
  styleUrl: './advance-info.component.css',
})
export class AdvanceInfoComponent {
  advData: { [key: string]: string } = {};

  labels = [
    { name: 'Short Description', rows: 1, cols: 10 },
    { name: 'Description', rows: 5, cols: 50 },
    { name: 'Expert Review', rows: 5, cols: 50 },
  ];

  onInput(event: Event, labelName: string) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.advData[labelName] = value;
  }
}
