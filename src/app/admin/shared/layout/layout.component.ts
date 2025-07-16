import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AllProductsComponent } from '../../components/all-products/all-products.component';
import { AddPhoneComponent } from '../../components/phone/add-phone/add-phone.component';
import { UpdateComponent } from "../../components/update/update.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-layout',
  imports: [CommonModule, AllProductsComponent, AddPhoneComponent, UpdateComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  selected = 'All Products';
  subselected = 'phone';
  phoneId: number | undefined;

  onSubMenu(submenu: string) {
    this.subselected = submenu;
  }

  onMenu(menu: string) {
    this.selected = menu
  }

  onUpdate(id: number) {
    this.selected = 'update';
    this.phoneId = id;
  }
}
