import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() { }

  private apiUrl = "http://localhost:5000/api/brands"
  private http: HttpClient = inject(HttpClient);

  getBrands(): Observable<{ brands_id: number, name: string }[]> {
    return this.http.get<{ brands_id: number, name: string }[]>(this.apiUrl);

  }
}
