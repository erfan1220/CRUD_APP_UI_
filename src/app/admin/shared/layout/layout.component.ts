import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AllProductsComponent } from '../../components/all-products/all-products.component';
import { AddPhoneComponent } from '../../components/phone/add-phone/add-phone.component';

@Component({
  selector: 'app-layout',
  imports: [MatIcon, CommonModule, AllProductsComponent,AddPhoneComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
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
        },{
          name: 'tablet'
        },{
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
    },{
      name:'log out',
      icon: 'logout'
    }
  ];

  refresh() {
    window.location.reload();
  }
}
