import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, Input, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { AdvanceInfoComponent } from '../advance-info/advance-info.component';
import { ImagesComponent } from '../images/images.component';
import { SpecificationsComponent } from '../specifications/specifications.component';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ProductsService } from '../../../shared/services/products.service';

@Component({
  selector: 'app-add-phone',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicInfoComponent,
    AdvanceInfoComponent,
    ImagesComponent,
    SpecificationsComponent,
    MatIcon
  ],
  templateUrl: './add-phone.component.html',
  styleUrl: './add-phone.component.css',
})
export class AddPhoneComponent {
  @Input() isDisable: boolean = true;


  fullData: { [key: string]: any } = {};
  step: number = 0;

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private ps: ProductsService = inject(ProductsService);

  form: FormGroup = this.fb.group({
    name: [''],
  });


  receivePartA(data: { [key: string]: string }) {
    Object.assign(this.fullData, data);
    console.log(this.fullData);
  }

  receiveSpecs(specs: { categoryId: number; subCategory: string; value: string }[]) {
    this.fullData['specification'] = specs;
    console.log(this.fullData);
  }

  reciveMainImage(file: File | null) {
    this.fullData['mainImage'] = file
    console.log(this.fullData);
  }

  onFromComplete(data: any) {
    // console.log(data);
    this.isDisable = data
  }

  onclick() {
    if (this.step === 3) {
      this.isDisable = false;
      this.submitData();
      window.location.reload();
    } else if (this.step === 2) {
      this.isDisable = false
      this.step += 1;
    } else {
      this.isDisable = true
      this.step += 1;
    }
  }

  submitData() {
    this.ps.addProduct(this.fullData).subscribe({
      next: () => {

      }, error: () => {

      }
    }
    )
  }

  backward() {
    this.step === 0 ? window.location.reload() : this.step -= 1
  }
}
