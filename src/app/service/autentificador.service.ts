import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Erabiltzaile {
  username: string;
  rola: string;
  pasahitza: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutentificadorService {
  private apiUrl = 'http://localhost:8080/api/erabiltzaileak';
  private erabiltzaileak: Erabiltzaile[] = [];
  
  // Cambiamos admin a un BehaviorSubject
  private adminSubject = new BehaviorSubject<boolean>(false);
  public admin$ = this.adminSubject.asObservable();  // Observable que los componentes pueden suscribirse

  constructor(private http: HttpClient, private router: Router) {}

  obtenerUsuarios(): Observable<Erabiltzaile[]> {
    return this.http.get<Erabiltzaile[]>(this.apiUrl);
  }

  login(username: string, password: string): boolean {
    const usuario = this.erabiltzaileak.find(u => u.username === username && u.pasahitza === password);

    if (usuario) {
      if (usuario.rola === 'IR') {
        console.log('Usuario es admin');
        this.adminSubject.next(true);  // 🔹 Actualiza el BehaviorSubject a true
      } else {
        console.log('Usuario NO es admin');
        this.adminSubject.next(false);
      }
      this.router.navigate(['/home']);
      return true;
    } else {
      return false;
    }
  }

  cargarUsuarios() {
    this.obtenerUsuarios().subscribe(usuarios => {
      this.erabiltzaileak = usuarios;
    });
  }
}
