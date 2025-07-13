import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  ],
  templateUrl: './add-phone.component.html',
  styleUrl: './add-phone.component.css',
})
export class AddPhoneComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  step: number = 0;

  form: FormGroup = this.fb.group({
    name: [''],
  });

  ngOnInit() {}

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    switch (index) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
    }
  }
}
