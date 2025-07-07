import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-product-modal',
  imports: [MatIcon,CommonModule],
  templateUrl: './delete-product-modal.component.html',
  styleUrl: './delete-product-modal.component.css',
})
export class DeleteProductModalComponent {
  @Input() modalOpen = false;
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();

  closeModal() {
    this.modalOpen = false;
    this.cancelDelete.emit();
  }

  confirm() {
    this.confirmDelete.emit();
  }

}
