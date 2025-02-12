import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-bezero',
  templateUrl: './tabla-bezero.component.html',
  styleUrls: ['./tabla-bezero.component.scss'],
})
export class TablaBezeroComponent {
  @Input() alumnos: any[] = [];
  @Output() seleccionar = new EventEmitter<any>();

  constructor() {}

  seleccionarAlumno(alumno: any) {
    this.seleccionar.emit(alumno);
  }
}
