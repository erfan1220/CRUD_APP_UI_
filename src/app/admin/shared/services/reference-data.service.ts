import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReferenceDataService {
  constructor() {}

  private brands_apiUrl = 'http://localhost:5000/api/brands';
  private sellers_apiUrl = 'http://localhost:5000/api/sellers';
  private categories_apiUrl = 'http://localhost:5000/api/categories';
  private subcategories_apiUrl = 'http://localhost:5000/api/subcategories';

  private http: HttpClient = inject(HttpClient);

  getBrands(): Observable<{ brands_id: number; name: string }[]> {
    return this.http.get<{ brands_id: number; name: string }[]>(
      this.brands_apiUrl
    );
  }

  getSellers(): Observable<{ seller_id: number; name: string }[]> {
    return this.http.get<{ seller_id: number; name: string }[]>(
      this.sellers_apiUrl
    );
  }

  categories(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(
      this.categories_apiUrl
    );
  }

  subcategories(): Observable<
    { id: number; category_id: number; name: string }[]
  > {
    return this.http.get<{ id: number; category_id: number; name: string }[]>(
      this.subcategories_apiUrl
    );
  }
}
