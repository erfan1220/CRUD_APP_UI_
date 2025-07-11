import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReferenceDataService } from '../../../shared/services/reference-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specifications',
  imports: [CommonModule, FormsModule],
  templateUrl: './specifications.component.html',
  styleUrl: './specifications.component.css',
})
export class SpecificationsComponent {
  categories: { id: number; name: string }[] = [];
  subcategories: { id: number; category_id: number; name: string }[] = [];
  related_subs: string[] = [];
  private rd: ReferenceDataService = inject(ReferenceDataService);
  selectedcat = '';

  ngOnInit() {
    this.rd.categories().subscribe({
      next: (data) => {
        this.categories = data;
        // console.log(data);
      },
    });

    this.rd.subcategories().subscribe({
      next: (data) => {
        this.subcategories = data;
        // console.log(data);
      },
    });
  }

  onChange(event: Event) {
    const value = +(event.target as HTMLSelectElement).value;
    this.subcategories.forEach((sub) => {
      if (sub.category_id === value) {
        this.related_subs.push(sub.name);
      }
    });
  }
}
