import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @Input() isOpen = false;

  email = localStorage.getItem('email');

  username = '';
  password = '';
  phonenumber = '';
  showPassword: boolean = false;
  imageSrc: string = 'Register.png';

  private formBuilder: FormBuilder = inject(FormBuilder);

  registerForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nameInput: ['', [Validators.required]],
      passwordInput: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*]).{8,32}'
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
  onSubmit() {
    if (this.registerForm.invalid) {
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.imageSrc === 'Register.png') {
      this.imageSrc = '';
    } else {
      this.imageSrc = 'Register.png';
    }
  }

  onlyNumber(event: KeyboardEvent) {
    const allowedkeys = ['Enter', 'Backespace'];
    const charCode = event.key;
    if (!/^[0-9]$/.test(charCode) && !allowedkeys.includes(charCode)) {
      event.preventDefault();
    }
  }
}
