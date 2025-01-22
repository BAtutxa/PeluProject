import { Component } from '@angular/core';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
})
export class FichaPage {
  listaAlumnos = [
    { nombre: 'Juan', apellido: 'Pérez', edad: 20 },
    { nombre: 'María', apellido: 'Gómez', edad: 22 },
    { nombre: 'Carlos', apellido: 'López', edad: 21 }
  ];

  constructor() {}
}
