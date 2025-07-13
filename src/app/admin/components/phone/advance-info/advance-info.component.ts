import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-advance-info',
  imports: [CommonModule],
  templateUrl: './advance-info.component.html',
  styleUrl: './advance-info.component.css',
})
export class AdvanceInfoComponent {
  advData: { [key: string]: string } = {};
  isDisable = true;
  labels = [
    { name: 'Short Description', rows: 1, cols: 10 },
    { name: 'Description', rows: 5, cols: 50 },
    { name: 'Expert Review', rows: 5, cols: 50 },
  ];
  requiredLabels = ['Short Description', 'Description', 'Expert Review'];


  @Output() formComplete = new EventEmitter<{ [key: string]: string }>();
  @Output() disable = new EventEmitter<boolean>()


  onInput(event: Event, labelName: string) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.advData[labelName] = value;
    this.checkAndEmit();
  }

  private checkAndEmit() {
    const allFilled = this.requiredLabels.every((label) =>
      this.advData[label]?.trim()
    );
    if (allFilled) {
      this.isDisable = false;
      this.disable.emit(this.isDisable);
      this.formComplete.emit(this.advData);
    } else {
      this.isDisable = true;
      this.disable.emit(this.isDisable)
    }
  }
}
