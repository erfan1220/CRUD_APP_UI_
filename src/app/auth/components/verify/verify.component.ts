import {
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-verify',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RegisterComponent,
  ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css',
})
export class VerifyComponent {
  mail = localStorage.getItem('email');
  token = localStorage.getItem('token');
  state = localStorage.getItem('state');

  text = '';
  value = new Array(6);
  code = '';
  show = false;
  hover = false;
  use_password = false;
  time = 180;
  Labeltimer = '';
  isDisable = false;
  isOpen = true;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private tokenservice: TokenService = inject(TokenService);

  verifyForm: FormGroup = new FormGroup({});
  ngOnInit() {
    this.verifyForm = this.formBuilder.group({
      verifyNum1: [
        '',
        [
          Validators.required,
          Validators.maxLength(1),
          Validators.pattern('[0-9]'),
        ],
      ],
      verifyNum2: [
        '',
        [
          Validators.required,
          Validators.maxLength(1),
          Validators.pattern('[0-9]'),
        ],
      ],
      verifyNum3: [
        '',
        [
          Validators.required,
          Validators.maxLength(1),
          Validators.pattern('[0-9]'),
        ],
      ],
      verifyNum4: [
        '',
        [
          Validators.required,
          Validators.maxLength(1),
          Validators.pattern('[0-9]'),
        ],
      ],
      verifyNum5: [
        '',
        [
          Validators.required,
          Validators.maxLength(1),
          Validators.pattern('[0-9]'),
        ],
      ],
      verifyNum6: [
        '',
        [
          Validators.required,
          Validators.maxLength(1),
          Validators.pattern('[0-9]'),
        ],
      ],
    });

    if (this.state == '1') {
      this.text = `enter the code sended to email <${this.mail}>`;
      this.use_password = true;
    } else {
      this.text = `An account with the email <${this.mail}> does not exist. Enter verification code to create a new account.`;
      this.use_password = false;
    }
  }

  @ViewChildren('in0, in1, in2, in3, in4, in5') inputs!: QueryList<ElementRef>;

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (index == 5) {
      this.value[index] = input.value;
    }
    if (input.value.length == 1 && index < 5) {
      this.value[index] = input.value;
      this.inputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  onKeyPress(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && input.value === '' && index > 0) {
      this.inputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  onSubmit() {
    if (this.verifyForm.invalid) {
      this.code = '';
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    } else if (this.state == '1') {
      for (let i = 0; i < 6; i++) {
        this.code += this.value[i];
      }
      // console.log(this.code);
      const requestBody = {
        token: this.token,
        code: this.code,
      };
      this.http
        .post<any>('http://localhost:5000/user/verify', requestBody)
        .subscribe({
          next: (res) => {
            const { status, data } = res;
            if (status == 200) {
              this.tokenservice.storeToken(data);
              const role = this.tokenservice.getUserRole(data);
              // console.log(role);
              if (role == 'user') {
                this.router.navigate(['main-page'], { replaceUrl: true });
              } else if (role == 'admin') {
                this.router.navigate(['admin'], { replaceUrl: true });
              }
            }
          },
          error: (err) => {
            const { status } = err;
            console.log(`status is ${status}`);
            this.code = '';
            this.show = true;
            setTimeout(() => {
              this.show = false;
            }, 3000);
          },
        });
    } else if (this.state == '-1') {
      this.isOpen = true;
    }
  }

  onlyNumber(event: KeyboardEvent) {
    const allowedkeys = ['Enter', 'Backespace'];
    const charCode = event.key;
    if (!/^[0-9]$/.test(charCode) && !allowedkeys.includes(charCode)) {
      event.preventDefault();
    }
  }
  onclick() {
    if (this.state != '-1') {
      this.router.navigate(['../auth/verify2']);
    }
  }
  onhover() {
    this.hover = true;
  }
  onout() {
    this.hover = false;
  }

  timer = setInterval(() => {
    const min = String(Math.trunc(this.time / 60)).padStart(2, '0');
    const second = String(this.time % 60).padStart(2, '0');
    this.time -= 1;
    this.Labeltimer = `${min}:${second}`;
    if (this.time == 0) {
      this.isDisable = true;
      this.Labeltimer = '00:00';
      clearInterval(this.timer);
    }
  }, 1000);
}
