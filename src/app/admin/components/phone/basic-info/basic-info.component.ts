import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReferenceDataService } from '../../../shared/services/reference-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.css',
})
export class BasicInfoComponent {
  basicData: { [key: string]: string } = {};
  labels: string[] = ['Name Product', 'Price', 'Stock', 'Discount'];
  reuireLabels: string[] = [
    'Name Product',
    'Price',
    'Stock',
    'Discount',
    'Seller',
    'Brand',
  ];
  isDisable = true;

  brands: { brands_id: number; name: string }[] = [];
  sellers: { seller_id: number; name: string }[] = [];

  @Output() formComplete = new EventEmitter<{ [key: string]: string }>();
  @Output() disable = new EventEmitter<boolean>();


  private rd: ReferenceDataService = inject(ReferenceDataService);

  ngOnInit() {
    this.rd.getBrands().subscribe({
      next: (data) => {
        this.brands = data;
      },
    });

    this.rd.getSellers().subscribe({
      next: (data) => {
        this.sellers = data;
      },
    });
  }

  onInput(event: Event, label: string) {
    const value = (event.target as HTMLInputElement).value;
    this.basicData[label] = value;
    this.checkAndEmit();
  }

  handleKeyPress(event: KeyboardEvent, label: string) {
    if (label != 'Name Product') {
      const allowedkeys = ['Enter', 'Backespace', '.'];
      const charCode = event.key;
      if (!/^[0-9]$/.test(charCode) && !allowedkeys.includes(charCode)) {
        event.preventDefault();
      }
    }
  }

  onchange(event: Event, index: number) {
    const value = (event.target as HTMLSelectElement).value;
    index == 0
      ? (this.basicData['Brand'] = value)
      : (this.basicData['Seller'] = value);
    this.checkAndEmit();
  }

  private checkAndEmit() {
    const allFilled = this.reuireLabels.every((label) =>
      this.basicData[label]?.trim()
    );
    if (
      allFilled &&
      this.basicData['Seller'] != '-1' &&
      this.basicData['Brand'] != '-1'
    ) {
      this.isDisable = false;
      this.disable.emit(this.isDisable);
      this.formComplete.emit(this.basicData);
    } else {
      this.isDisable = true;
      this.disable.emit(this.isDisable)
    }
  }
}
