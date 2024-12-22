import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-control',
  templateUrl: './barra-control.component.html',
  styleUrls: ['./barra-control.component.scss'],
})
export class BarraControlComponent implements OnInit {
  fechaActual: string='';

  constructor() {}

  ngOnInit() {
    // fecha actual
    this.fechaActual = new Date().toISOString().split('T')[0];
  }
  retrocederFecha() {
    const fecha = new Date(this.fechaActual);
    fecha.setDate(fecha.getDate() - 1);
    this.fechaActual = fecha.toISOString().split('T')[0];
  }

  avanzarFecha() {
    const fecha = new Date(this.fechaActual);
    fecha.setDate(fecha.getDate() + 1);
    this.fechaActual = fecha.toISOString().split('T')[0];
  }
}
