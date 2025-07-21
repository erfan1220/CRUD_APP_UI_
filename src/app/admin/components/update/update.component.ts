import { Component, inject, Input } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ReferenceDataService } from '../../shared/services/reference-data.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/types/product';
import { FormsModule } from '@angular/forms';
import { ImagesComponent } from '../phone/images/images.component';
import { LoadingSvgComponent } from '../loading-svg/loading-svg.component';
import { SpecificationsComponent } from '../phone/specifications/specifications.component';

@Component({
  selector: 'app-update',
  imports: [
    ModalComponent,
    CommonModule,
    FormsModule,
    ImagesComponent,
    LoadingSvgComponent,
    SpecificationsComponent,
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  @Input() phoneId: number | undefined;

  originalField: { label: string; value: string | number }[] = [];
  originalExp: { label: string; value: string; rows: number; cols: number }[] =
    [];
  changeImage: boolean = false;
  detail: Product | undefined;
  loading: boolean = false;
  rows = 10;
  cols = 50;
  sellerId: number | undefined;
  modalOpen = true;
  sellers: { seller_id: number; name: string }[] = [];
  productDetails: Product[] = [];
  image_src: string = '';
  selectedImageFile: File | null = null;
  specs: {
    category: string;
    categoryId: number;
    subCategory: string;
    subcategoryId: number;
    value: string;
    relatedSubs: { name: string; id: number }[];
  }[] = [];
  labels = [
    {
      name: 'Short Description',
      rows: 1,
      cols: 50,
      value: 'Write your short description here...',
    },
    {
      name: 'Description',
      rows: 5,
      cols: 50,
      value: 'Write your description here...',
    },
    {
      name: 'Expert Review',
      rows: 5,
      cols: 50,
      value: 'Write your expert review here...',
    },
  ];
  field: { label: string; value: string | number }[] = [];
  exp: { label: string; value: string; rows: number; cols: number }[] = [];
  originalSpecs: typeof this.specs = [];

  private rd: ReferenceDataService = inject(ReferenceDataService);
  private ps: ProductsService = inject(ProductsService);

  reciveMainImage(file: File | null) {
    this.selectedImageFile = file;
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('product_id', String(this.phoneId));
    formData.append('seller_id', String(this.sellerId));

    if (this.changeImage && this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    this.originalField.forEach((item) => {
      const current = this.field.find((f) => f.label === item.label);
      if (current && current.value !== item.value) {
        formData.append(item.label.toLowerCase(), current.value.toString());
      }
    });

    this.originalExp.forEach((item) => {
      const current = this.exp.find((e) => e.label === item.label);
      if (current && current.value !== item.value) {
        formData.append(item.label, current.value);
      }
    });

    if (JSON.stringify(this.specs) !== JSON.stringify(this.originalSpecs)) {
      formData.append('specifications', JSON.stringify(this.specs));
    }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    this.ps.updateProduct(formData).subscribe({
      next: () => {
        alert('Update successful!');
        window.location.reload();
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Update failed!');
      },
    });
  }

  closeModal() {
    this.modalOpen = false;
    window.location.reload();
  }

  ngOnInit() {
    this.rd.getSellers(this.phoneId).subscribe({
      next: (data) => {
        this.sellers = data;
      },
    });
  }

  onclick(id: number) {
    this.loading = true;
    this.sellerId = id;
    this.modalOpen = false;

    const model = {
      phoneId: this.phoneId,
      sellerId: this.sellerId,
    };

    this.ps.getDetails(model).subscribe({
      next: (data) => {
        this.productDetails = data;
        this.detail = this.productDetails[0];

        this.originalField = [];
        this.field = [];
        this.originalExp = [];
        this.exp = [];
        this.specs = [];
        this.originalSpecs = [];

        if (this.detail?.specifications?.length) {
          this.specs = this.detail.specifications.map((i) => ({
            category: i.category_name,
            categoryId: i.category_id,
            subCategory: i.subcategory_name,
            subcategoryId: i.subcategory_id,
            value: i.value,
            relatedSubs: [],
          }));
          this.originalSpecs = structuredClone(this.specs);
        }

        if (this.detail?.price) {
          this.originalField.push({ label: 'Price', value: this.detail.price });
          this.field.push({ label: 'Price', value: this.detail.price });
        }
        if (this.detail?.stock !== undefined) {
          this.originalField.push({ label: 'Stock', value: this.detail.stock });
          this.field.push({ label: 'Stock', value: this.detail.stock });
        }

        if (this.detail.image_url) {
          this.image_src = `http://localhost:5000/uploads/${this.detail.image_url}`;
        }

        if (this.detail?.explanation?.length) {
          this.detail.explanation
            .filter((e) => e?.partname && e?.value)
            .forEach((e) => {
              const rows = e.partname === 'shortDescription' ? 1 : 10;
              const cols = 50;
              const item = {
                label: e.partname,
                value: e.value,
                rows,
                cols,
              };
              this.originalExp.push(structuredClone(item));
              this.exp.push(structuredClone(item));
            });
        } else {
          this.labels.forEach((m) => {
            const item = {
              label: m.name,
              value: m.value,
              rows: m.rows,
              cols: m.cols,
            };
            this.originalExp.push(structuredClone(item));
            this.exp.push(structuredClone(item));
          });
        }

        this.loading = false;
      },
    });
  }
}
