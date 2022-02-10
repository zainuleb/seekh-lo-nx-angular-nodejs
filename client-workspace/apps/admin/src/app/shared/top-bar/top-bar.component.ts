import { Component } from '@angular/core';
import { AppMainComponent } from '../../pages/app-main/app-main.component';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'admin-top-bar',
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  items: MenuItem[];
  constructor(public appMain: AppMainComponent) {}
}
