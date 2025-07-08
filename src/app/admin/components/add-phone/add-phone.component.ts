import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BrandService } from '../../shared/services/brand.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerService } from '../../shared/services/seller.service';

@Component({
  selector: 'app-add-phone',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-phone.component.html',
  styleUrl: './add-phone.component.css'
})
export class AddPhoneComponent {

  imagePreviews: string[] = [];
  imageFiles: File[] = [];

  brands: { brands_id: number, name: string }[] = [];
  selectedBrand = '';

  sellers: { seller_id: number, name: string }[] = [];
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
      }
    })
    this.sellerService.getSellers().subscribe({
      next: (data) => {
        this.sellers = data;
      }
    })

  }

  onFilesSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    console.log(files);
    if (files) {
      // this.imagePreviews = [];
      // this.imageFiles = [];

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
        this.imageFiles.push(file);
        console.log(this.imageFiles);
        console.log(this.imagePreviews);
      });
    }
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.imageFiles.splice(index, 1);
  }
}
