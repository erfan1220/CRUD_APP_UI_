import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BrandService } from '../../shared/services/brand.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SellerService } from '../../shared/services/seller.service';

@Component({
  selector: 'app-add-phone',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-phone.component.html',
  styleUrl: './add-phone.component.css',
})
export class AddPhoneComponent {
  imagePreviews: string[] = [];
  imageFiles: File[] = [];
  selectedImage: string = '';
  maxSizeKB: number = 30;

  brands: { brands_id: number; name: string }[] = [];
  selectedBrand = '';

  sellers: { seller_id: number; name: string }[] = [];
  selectedSeller = '';

  private brandService: BrandService = inject(BrandService);
  private sellerService: SellerService = inject(SellerService);
  private fb: FormBuilder = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: [''],
  });

  ngOnInit() {
    this.brandService.getBrands().subscribe({
      next: (data) => {
        this.brands = data;
      },
    });
    this.sellerService.getSellers().subscribe({
      next: (data) => {
        this.sellers = data;
      },
    });
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFiles = Array.from(input.files);
      this.imagePreviews = [];
      const maxSizeBytes = this.maxSizeKB * 1024;
      this.imageFiles.forEach((file) => {
        if (file.size > maxSizeBytes) {
          alert(`File "${file.name}" is too large (max ${this.maxSizeKB} KB).`);
          return;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target?.result);
          this.selectedImage = this.imagePreviews[0];
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.imageFiles.splice(index, 1);
    if (this.imagePreviews.length === 0) {
      this.selectedImage = '';
    }
  }

  selectImage(index: number) {
    this.selectedImage = this.imagePreviews[index];
  }
}
