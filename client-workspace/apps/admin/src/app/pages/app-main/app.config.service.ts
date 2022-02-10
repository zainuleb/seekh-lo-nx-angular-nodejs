import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from './appconfig';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: AppConfig = {
    theme: 'md-dark-indigo',
    dark: false,
  };

  private configUpdate = new Subject<AppConfig>();

  configUpdate$ = this.configUpdate.asObservable();

  updateConfig(config: AppConfig) {
    this.config = config;
    this.configUpdate.next(config);
  }

  getConfig() {
    return this.config;
  }
}
