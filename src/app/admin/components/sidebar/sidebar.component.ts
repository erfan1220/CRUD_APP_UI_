import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [MatIcon, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() menu = new EventEmitter<string>();
  @Output() submenu = new EventEmitter<string>();


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
    this.menu.emit(this.selected)
  }
}
