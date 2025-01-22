import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cita {
  id?: number;
  izena: string;
  data: string;
  hasieraOrdua: string;
  deskribapena: string;
}

@Injectable({
  providedIn: 'root'
})
export class HitzorduakService {
  private apiUrl = 'http://localhost:8080/api/hitzorduak';

  constructor(private http: HttpClient) {}

  getHitzorduak(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  addHitzordua(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  updateHitzordua(id: number, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/${id}`, cita);
  }
  
  updateHoraReal(id: number, horaReal: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/actualizar-hora-real`, { hasieraOrduaErreala: horaReal });
  }
  updateHoraFinalReal(id: number, horaFinalReal: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/actualizar-hora-final`, { amaieraOrduaErreala: horaFinalReal });
  }
  
}
