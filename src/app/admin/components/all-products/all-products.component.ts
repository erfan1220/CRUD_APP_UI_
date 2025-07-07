import { Component, inject } from '@angular/core';
import { GetProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DeleteProductModalComponent } from "../delete-product-modal/delete-product-modal.component";

@Component({
  selector: 'app-all-products',
  imports: [CommonModule, DeleteProductModalComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  loading = true;
  modal_open = false;
  selectedProductToDelete: number | null = null;
  products: { phone_id: number; name: string }[] = [];

  private producservice: GetProductsService = inject(GetProductsService);
  private router: Router = inject(Router);

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

  confirmDeleteProduct(id: number) {
    this.modal_open = true;
    this.selectedProductToDelete = id;
  }

  onDelete() {
    this.producservice.deleteProduct(this.selectedProductToDelete).subscribe({
      next: () => {},
      error: (err) => {
        console.error('Could not delete product', err);
      },
    });
    window.location.reload();
  }

  closeModal() {
    this.selectedProductToDelete = null;
    this.modal_open = false;
  }

  addProduct() {
    this.router.navigate(['/admin/addproduct']);
  }
}
