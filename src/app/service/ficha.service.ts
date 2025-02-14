import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Bezeroa {

  id?: number;
  izena: string;
  abizena:string;
  telefonoa: string;
  azal_sentikorra: string;
  sortze_data: string;
  eguneratze_data:string;
  ezabatze_data:string;

}

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  private apiUrl="http://localhost:8080/bezeroak"

  constructor( private http: HttpClient) { }

  getBezeroak(): Observable<Bezeroa[]> {
    return this.http.get<Bezeroa[]>(this.apiUrl);
  }
  
  addBezeroa(bezeroa: Partial<Bezeroa>): Observable<Bezeroa> {
    return this.http.post<Bezeroa>(this.apiUrl, bezeroa);
  }

}

