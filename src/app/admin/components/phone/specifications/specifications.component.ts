import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReferenceDataService } from '../../../shared/services/reference-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specifications',
  imports: [CommonModule, FormsModule],
  templateUrl: './specifications.component.html',
  styleUrl: './specifications.component.css',
})
export class SpecificationsComponent {
  @Output() specsChanged = new EventEmitter<
    { categoryId: number; subCategory: string; value: string }[]
  >();

  specifications = [
    { categoryId: -1, subCategory: '', value: '', relatedSubs: [] as string[] }
  ];
  categories: { id: number; name: string }[] = [];
  subcategories: { id: number; category_id: number; name: string }[] = [];
  related_subs: string[] = [];
  selectedcat = '';

  private rd: ReferenceDataService = inject(ReferenceDataService);


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


  addSpecification() {
    this.specifications.push({ categoryId: -1, subCategory: '', value: '', relatedSubs: [] });
  }

  onChange(index: number, event: Event) {
    const categoryId = +(event.target as HTMLSelectElement).value;
    this.specifications[index].categoryId = categoryId;

    const related = this.subcategories
      .filter(sub => sub.category_id === categoryId)
      .map(sub => sub.name);

    this.specifications[index].relatedSubs = related;
    this.specifications[index].subCategory = '';
    this.emitMinimalData();
  }

  onSubChange(index: number, event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.specifications[index].subCategory = value;
    this.emitMinimalData();
  }


  onValueChange(index: number, event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.specifications[index].value = value;
    this.emitMinimalData();
  }

  emitMinimalData() {
    const cleaned = this.specifications
      .filter(s => s.categoryId !== -1 && s.subCategory && s.value)
      .map(s => ({
        categoryId: s.categoryId,
        subCategory: s.subCategory,
        value: s.value
      }));

    this.specsChanged.emit(cleaned);
  }

}
