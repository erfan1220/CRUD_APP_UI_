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
import { AdvanceInfoComponent } from "../phone/advance-info/advance-info.component";

@Component({
  selector: 'app-update',
  imports: [
    ModalComponent,
    CommonModule,
    FormsModule,
    ImagesComponent,
    LoadingSvgComponent,
    SpecificationsComponent,
    AdvanceInfoComponent
],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  @Input() phoneId: number | undefined;

  fullData: { [key: string]: any } = {};
  field: { label: string; value: string | number }[] = [];
  exp: { label: string; value: string; rows: number; cols: number }[] = [];
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

  private rd: ReferenceDataService = inject(ReferenceDataService);
  private ps: ProductsService = inject(ProductsService);

  receivePartA(data: { [key: string]: string }) {
    Object.assign(this.fullData, data);
    console.log(this.fullData);
  }

  receiveSpecs(
    specs: { categoryId: number; subCategoryId: number; value: string }[]
  ) {
    this.fullData['specification'] = specs;
    console.log(this.fullData);
  }

  reciveMainImage(file: File | null) {
    this.fullData['mainImage'] = file;
    console.log(this.fullData);
  }

  onSubmit() {
    const formData = new FormData();
    for (const key in this.fullData) {
      const value = this.fullData[key];
      if (key === 'specification') {
      }

      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    }
    console.log(formData);

    // this.ps.updateProduct(formData).subscribe({
    //   next: () => {},
    //   error: () => {},
    // });
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
        // console.log(this.detail);

        if (this.detail?.specifications?.length) {
          this.detail.specifications.forEach((i) => {
            this.specs.push({
              category: i.category_name,
              categoryId: i.category_id,
              subCategory: i.subcategory_name,
              subcategoryId: i.subcategory_id,
              value: i.value,
              relatedSubs: [],
            });
          });
        }

        if (this.detail?.price) {
          this.field.push({ label: 'Price', value: this.detail.price });
        }
        if (this.detail?.stock !== undefined) {
          this.field.push({ label: 'Stock', value: this.detail.stock });
        }
        if (this.detail.image_url) {
          this.image_src = `http://localhost:5000/uploads/${this.detail.image_url}`;
        }

        if (this.detail?.explanation?.length) {
          this.detail.explanation
            .filter((e) => e?.partname && e?.value)
            .forEach((e) => {
              if (e.partname === 'shortDescription') {
                this.rows = 1;
                this.cols = 50;
              } else {
                this.rows = 10;
                this.cols = 50;
              }
              this.exp.push({
                label: e.partname,
                value: e.value,
                rows: this.rows,
                cols: this.cols,
              });
            });
        } else {
          this.labels.forEach((m) => {
            this.exp.push({
              label: m.name,
              value: m.value,
              rows: this.rows,
              cols: this.cols,
            });
          });
        }
        this.loading = false;
      },
    });
  }
}
