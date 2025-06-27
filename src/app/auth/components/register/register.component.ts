import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @Input() isOpen = false;

  email = localStorage.getItem('email');

  username = '';
  password = '';
  phonenumber = '';

  onInput(event: Event, index: number){
    const input = event.target as HTMLInputElement;
    if(index == 0){
      this.username = input.value;
    }else if(index == 1){
      this.password = input.value;
    }else if(index == 2){
      this.phonenumber = input.value;
    }
  }


  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
