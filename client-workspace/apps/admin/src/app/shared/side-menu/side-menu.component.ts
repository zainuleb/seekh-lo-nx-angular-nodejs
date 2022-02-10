import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../../pages/app-main/app-main.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'admin-side-menu',
  templateUrl: 'side-menu.component.html',
})
export class SideMenuComponent implements OnInit {
  items: MenuItem[];

  constructor(public appMain: AppMainComponent) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/dashboard'],
      },
      {
        label: 'Categories',
        icon: 'pi pi-fw pi-sitemap',
        routerLink: ['/categories'],
      },
      {
        label: 'Courses',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/courses'],
      },
      {
        label: 'User',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/users'],
      },
    ];
  }
}
