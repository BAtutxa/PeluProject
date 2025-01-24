import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cita {
  id?: number;
  izena: string;               // Nombre de la persona
  data: string;                // Fecha de la cita
  hasieraOrdua: string;         // Hora de inicio
  amaieraOrdua?: string | null;  // Hora de fin
  hasieraOrduaErreala?: string | null;  // Hora real de inicio
  amaieraOrduaErreala?: string | null;  // Hora real de fin
  deskribapena: string;         // Descripción de la cita
  eserlekua: number;            // Número de asiento
  telefonoa?: string;           // Teléfono de contacto
  etxekoa: string;              // Interno (E) o Externo (K)
  prezioTotala: number;         // Precio total
  sortzeData: string;           
  eguneratzeData?: string | null;  
  ezabatzeData?: string | null;    
  langileaId?: number;          
}

@Injectable({
  providedIn: 'root'
})
export class HitzorduakService {
  private apiUrl = 'http://localhost:8080/api/hitzorduak';

  constructor(private http: HttpClient) {}

  // Obtener todas las citas
  getHitzorduak(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  // Agregar una nueva cita
  addHitzordua(cita: Cita): Observable<Cita> {
    const citaCompleta: Cita = {
      ...cita,
      amaieraOrdua: cita.amaieraOrdua || null,
      hasieraOrduaErreala: cita.hasieraOrduaErreala || null,
      amaieraOrduaErreala: cita.amaieraOrduaErreala || null,
      eserlekua: cita.eserlekua || 0,
      telefonoa: cita.telefonoa || '',
      etxekoa: cita.etxekoa || 'K',
      prezioTotala: cita.prezioTotala || 0,
      sortzeData: new Date().toISOString(),  // Fecha y hora actual en formato ISO
      eguneratzeData: null,  
      ezabatzeData: null,    
      langileaId: cita.langileaId || 0  // Valor por defecto si no se proporciona
    };

    console.log('Enviando cita:', citaCompleta);

    return this.http.post<Cita>(this.apiUrl, citaCompleta);
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

  deleteHitzordua(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
