import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../../pages/app-main/app-main.component';

@Component({
  selector: 'admin-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(public appMain: AppMainComponent) {}
}
