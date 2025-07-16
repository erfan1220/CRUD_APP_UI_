import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TokenService } from '../../../shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MatIcon, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() menu = new EventEmitter<string>();
  @Output() submenu = new EventEmitter<string>();

  private tokenService: TokenService = inject(TokenService)
  private router: Router = inject(Router);


  selected = 'All Products';
  subselected = 'phone';
  menu_items = [
    {
      name: 'All Products',
      icon: 'all_inclusive',
    },
    {
      name: 'Add Product',
      icon: 'playlist_add',
      children: [
        { name: 'phone' },
        {
          name: 'laptop',
        }, {
          name: 'tablet'
        }, {
          name: 'accessories'
        }
      ],
    },
    {
      name: 'coupons',
      icon: 'sell',
    },
    {
      name: 'pricing table',
      icon: 'euro',
    }, {
      name: 'log out',
      icon: 'logout'
    }
  ];


  refresh() {
    window.location.reload();
  }

  onSubChange(name: string) {
    this.subselected = name;
    this.submenu.emit(this.subselected)
  }

  onChange(name: string) {
    this.selected = name;
    this.menu.emit(this.selected);
    if (name === "log out") {
      this.tokenService.clearToken();
      this.router.navigate(['main-page'], { replaceUrl: true })
    }
  }
}
