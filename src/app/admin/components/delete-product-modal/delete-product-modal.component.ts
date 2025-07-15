import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "../../../shared/components/modal/modal.component";

@Component({
  selector: 'app-delete-product-modal',
  imports: [CommonModule, ModalComponent],
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
