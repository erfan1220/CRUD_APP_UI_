import { Component, ElementRef, inject, viewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // isActive = false;

  private formBuilder: FormBuilder = inject(FormBuilder);

  loginForm: FormGroup = new FormGroup({});
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      EmailInput: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
    });
    // if (this.loginForm.valid) {
    //   this.isActive = true
    // } else {
    //   this.isActive = false
    // }
  }

  onSubmit() {
  }
}
