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
  currencyOpt = [
    { code: 'USD', value: 0 },
    { label: 'PKR', value: 0 },
  ];
  constructor(private http: HttpClient) {}

  currencyURL = environment.currencyURL;

  currencyAPI(): Observable<CurrencyAPI> {
    return this.http.get<CurrencyAPI>(this.currencyURL);
  }

  /*   getCurrency(id: string, amount: number): Observable<number> {
    this.currencyAPI().subscribe((res) => {
      this.data = res;
      const entries = Object.entries(this.data.rates);
      const result = entries.find((key) => key[0] === id);

      console.log('value', Number(amount) * Number(result[1]));
      return Number(amount) * Number(result['1']);
      //   console.log(entries);
      //   const result = entries.find((key) => {
      //     if (key[0] === id) return key[1];
      //     return false;
      //   });
      //   console.log(typeof result[1]);
      //   //   const resultValue: number = result[1];

      //   console.log(result);
      //   return amount * resultValue;
    });
  } */
}
