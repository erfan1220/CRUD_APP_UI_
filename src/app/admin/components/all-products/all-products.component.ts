import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeleteProductModalComponent } from "../delete-product-modal/delete-product-modal.component";
import { LoadingSvgComponent } from "../loading-svg/loading-svg.component";

@Component({
  selector: 'app-all-products',
  imports: [CommonModule, DeleteProductModalComponent, LoadingSvgComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  @Output() update = new EventEmitter<number>();

  loading = true;
  modal_open = false;
  selectedProductToDelete: number | null = null;
  products: { phone_id: number; name: string }[] = [];

  private producservice: ProductsService = inject(ProductsService);
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
      next: () => { },
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

  onupdate(id: number) {
    this.update.emit(id);
  }
}
