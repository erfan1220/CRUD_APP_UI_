import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


interface JwtPayload {
  id: number;
  email: string;
  role: string;
  exp: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() { }

  decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  getUserRole(token: string): string | null {
    const decoded = this.decodeToken(token);
    return decoded?.role || null;
  }

  getUserEmail(token: string): string | null {
    const decoded = this.decodeToken(token);
    return decoded?.email || null;
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserInfo(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (e) {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getUserInfo();
  }
}
