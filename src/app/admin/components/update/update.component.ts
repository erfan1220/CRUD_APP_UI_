import { Component, inject, Input } from '@angular/core';
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { ReferenceDataService } from '../../shared/services/reference-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  imports: [ModalComponent, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  @Input() phoneId: number | null = null;
  sellerId: number | null = null;

  modalOpen = true;
  sellers: { seller_id: number; name: string }[] = []

  private rd: ReferenceDataService = inject(ReferenceDataService)

  closeModal() {
    this.modalOpen = false
    window.location.reload();
  }

  ngOnInit() {
    this.rd.getSellers(this.phoneId).subscribe({
      next: (data) => {
        if (data.length === 1) {
          this.sellerId = data[0].seller_id;
        } else {
          this.sellers = data
        }
      }
    })
  }

  onclick(id: number) {
    this.sellerId = id;
    console.log(this.sellerId);
    console.log(this.phoneId);
  }
}
