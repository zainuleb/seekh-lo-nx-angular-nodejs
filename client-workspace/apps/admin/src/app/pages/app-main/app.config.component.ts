import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppConfig } from './appconfig';
import { AppComponent } from '../../app.component';
import { AppMainComponent } from './app-main.component';
import { ConfigService } from './app.config.service';

@Component({
  selector: 'admin-app-config',
  templateUrl: './app.config.component.html',
})
export class AppConfigComponent implements OnInit, OnDestroy {
  config: AppConfig;

  subscription: Subscription;

  constructor(
    public app: AppComponent,
    public appMain: AppMainComponent,
    public configService: ConfigService,
    public primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe((config) => {
      this.config = config;
    });
  }

  onConfigButtonClick(event: Event) {
    this.appMain.configActive = !this.appMain.configActive;
    this.appMain.configClick = true;
    event.preventDefault();
  }

  changeTheme(theme: string, dark: boolean) {
    const themeElement = document.getElementById('theme-css');
    themeElement.setAttribute('href', 'assets/theme/' + theme + '/theme.css');
    this.configService.updateConfig({ ...this.config, ...{ theme, dark } });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
