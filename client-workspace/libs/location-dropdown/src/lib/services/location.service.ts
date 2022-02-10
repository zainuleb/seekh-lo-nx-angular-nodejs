import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
//Import Models
import { Country } from '../model/country';
import { State } from '../model/state';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  apiURLCountries = environment.apiURL + 'countries';

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiURLCountries);
  }

  getStates(countryId: number): Observable<State[]> {
    return this.http.get<State[]>(`${this.apiURLCountries}/${countryId}`);
  }

  getCities(countryId: number, stateId: number): Observable<City[]> {
    return this.http.get<State[]>(
      `${this.apiURLCountries}/${countryId}/${stateId}`
    );
  }
}
