import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  labels = ['Name Product', 'Price', 'Stock', 'Discount'];

  brands: { brands_id: number; name: string }[] = [];
  selectedBrand = '';

  sellers: { seller_id: number; name: string }[] = [];
  selectedSeller = '';

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
    // console.log(this.basicData);
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
}
