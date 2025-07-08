import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor() { }
  private apiUrl = "http://localhost:5000/api/sellers"

  private http: HttpClient = inject(HttpClient);

  getSellers(): Observable<{ seller_id: number, name: string }[]> {
    return this.http.get<{ seller_id: number, name: string }[]>(this.apiUrl)
  }

}
