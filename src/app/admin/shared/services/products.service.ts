import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  token = localStorage.getItem('token');


  private apiUrl = 'http://localhost:5000/admin/products';

  private http: HttpClient = inject(HttpClient);

  getProducts(): Observable<any> {
    // console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.get<any>(this.apiUrl, { headers });
  }

  deleteProduct(productId: number | null): Observable<any> {
    const apiUrl = `http://localhost:5000/admin/products/${productId}`;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.delete<any>(apiUrl, { headers })
  }

  addProduct(body: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<any>(this.apiUrl, body, { headers })
  }
}
