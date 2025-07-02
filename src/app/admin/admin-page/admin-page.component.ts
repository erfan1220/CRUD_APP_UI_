import { Component, inject } from '@angular/core';
import { from } from 'rxjs';
import { GetProductsService } from '../services/get-products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-page',
  imports: [CommonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {
  loading = true;
  products: { name: string }[] = [];

  private producservice: GetProductsService = inject(GetProductsService);

  ngOnInit() {
    this.producservice.getProducts().subscribe({
      next: (data) => {
        // console.log(data);
        // console.log(data[0].name);
        this.products = data;
        // setTimeout(() => {
        // }, 3000);
        this.loading = false;
      },
      error: (err) => {
        console.error('cant load products', err);
        // this.loading = false;
      },
    });
  }
}
