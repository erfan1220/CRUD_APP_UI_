import { Component, inject } from '@angular/core';
import { GetProductsService } from '../shared/services/products.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-admin-page',
  imports: [CommonModule, MatIcon],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {
  loading = true;
  modal_open = false;
  products: { phone_id: number, name: string }[] = [];

  private producservice: GetProductsService = inject(GetProductsService);

  ngOnInit() {
    this.producservice.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        // console.log(data[0].phone_id);
        this.loading = false;
      },
      error: (err) => {
        console.error('cant load products', err);

      },
    });
  }

  onDelete(id: number) {
    this.modal_open = true;
    // this.producservice.deleteProduct(id).subscribe({
    //   next: () => {

    //   },
    //   error: (err) => {
    //     console.error('Could not delete product', err);
    //   }
    // })
  }
  closeModal() {
    console.log('test');
  }
}
