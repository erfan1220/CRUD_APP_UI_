import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetProductsService {
  private apiUrl = 'http://localhost:5000/admin/products';

  private http: HttpClient = inject(HttpClient);

  getProducts(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);//=====
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
