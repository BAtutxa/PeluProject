import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Login {
  message: string; 
  username?: string; 
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutentificadorService {
  private apiUrl = 'http://localhost:8080/api/erabiltzaileak/login'; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/login`, { username, password });
  }
}
