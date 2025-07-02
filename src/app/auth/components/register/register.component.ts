import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @Input() isOpen = false;

  // token = localStorage.getItem('token');
  email = localStorage.getItem('email');

  username = '';
  password = '';
  phonenumber = '';
  existingUser = false;
  error_text = 'User with this email or phone numer already registered !';
  showPassword = false;
  loading = false;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private tokenservice: TokenService = inject(TokenService);

  registerForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nameInput: ['', [Validators.required, Validators.minLength(5)]],
      passwordInput: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*]).*$'
          ),
          Validators.minLength(8),
        ],
      ],
      phoneNumberInput: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('(09)[0-9]{9}'),
        ],
      ],
    });
  }
  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (index == 0) {
      this.username = input.value;
    } else if (index == 1) {
      this.password = input.value;
    } else if (index == 2) {
      this.phonenumber = input.value;
    }
  }
  //================================
  onSubmit() {
    // console.log('test');
    // this.router.navigate(['../'], { replaceUrl: true });
    if (this.registerForm.invalid) {
      this.error_text =
        'All fields are required. Complete the form to continue.';
      this.existingUser = true;
      setTimeout(() => {
        this.existingUser = false;
      }, 3000);
    } else {
      // const mail = this.tokenservice.getUserEmail(this.token!)
      this.loading = true;

      const requestBody = {
        name: this.username,
        email: this.email,
        // token: this.token,
        password: this.password,
        phonenumber: this.phonenumber,
      };
      this.http
        .post<any>('http://localhost:5000/user/register', requestBody)
        .subscribe({
          next: (res) => {
            const { data } = res;
            this.tokenservice.storeToken(data);
            localStorage.removeItem('state');
            localStorage.removeItem('email');
            this.router.navigate(['main-page'], { replaceUrl: true });
          },
          error: (err) => {
            this.loading = false;
            const { status } = err;
            if (status == 409) {
              this.existingUser = true;
              setTimeout(() => {
                this.existingUser = false;
              }, 3000);
            } else {
              this.existingUser = true;
              this.error_text = 'Some thing went wrong !';
              setTimeout(() => {
                this.existingUser = false;
              }, 3000);
            }
          },
        });
    }
  }
  //=====================

  onlyNumber(event: KeyboardEvent) {
    const allowedkeys = ['Enter', 'Backespace'];
    const charCode = event.key;
    if (!/^[0-9]$/.test(charCode) && !allowedkeys.includes(charCode)) {
      event.preventDefault();
    }
  }

  togglepass() {
    // this.loading = false;
    this.showPassword = !this.showPassword;
  }
}
