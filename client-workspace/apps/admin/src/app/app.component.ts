import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'admin-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  menuMode = 'static';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    document.documentElement.style.fontSize = '14px';
  }
}
