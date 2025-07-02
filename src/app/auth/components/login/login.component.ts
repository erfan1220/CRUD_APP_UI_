import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isEmpty = false;
  isInValid = false;
  isFocused = false;
  value = '';
  loading = false;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  loginForm: FormGroup = new FormGroup({});
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      EmailInput: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.isInValid = true;
    } else {
      this.isInValid = false;
      this.loading = true;
      const requestBody = {
        user_email: this.value,
      };
      this.http
        .post<any>('http://localhost:5000/user/login', requestBody)
        .subscribe({
          next: (res) => {
            const { data, message } = res;
            localStorage.setItem('email', this.value);
            localStorage.setItem('token', data);
            localStorage.setItem('state', message);
            this.router.navigate(['/auth/verify']);
          },
          error: (err) => {
            this.loading = false;
            console.log(err);
          },
        });
    }
  }

  onchange(event: any) {
    this.value = event.target.value;
    if (this.value.trim() == '') this.isEmpty = true;
    else {
      this.isEmpty = false;
    }
  }
}
