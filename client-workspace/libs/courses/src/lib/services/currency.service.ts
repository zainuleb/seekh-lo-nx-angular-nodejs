import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

import { CurrencyAPI } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  data: CurrencyAPI;

  constructor(private http: HttpClient) {}

  currencyURL = environment.currencyURL;

  currencyAPI(): Observable<CurrencyAPI> {
    return this.http.get<CurrencyAPI>(this.currencyURL);
  }
}
