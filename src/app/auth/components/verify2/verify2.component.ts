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
  selector: 'app-verify2',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './verify2.component.html',
  styleUrl: './verify2.component.css',
})
export class Verify2Component {
  mail = localStorage.getItem('email');
  token = localStorage.getItem('token');
  state = localStorage.getItem('state');
  show = false;
  isFocused = false;
  password = '';

  private formBuilder: FormBuilder = inject(FormBuilder);
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  loginForm: FormGroup = new FormGroup({});
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      PasswordInput: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    } else {
      const requestBody = {
        token: this.token,
        password: this.password,
      };
      this.http
        .post<any>('http://localhost:5000/user/verify2', requestBody)
        .subscribe({
          next: (res) => {
            const { status, data } = res;
            // const { email, role } = jwt.verify();
            if (status == 400) {
              this.show = true;
              setTimeout(() => {
                this.show = false;
              }, 3000);
            } else if (status == 200) {
              localStorage.setItem('token', data);
              
              this.router.navigate(['../']);
            }
            console.error(res);
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  onchange(event: any) {
    this.password = event.target.value;
  }
}
