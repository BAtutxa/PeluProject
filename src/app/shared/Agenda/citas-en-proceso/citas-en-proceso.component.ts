import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-citas-en-proceso',
  templateUrl: './citas-en-proceso.component.html',
  styleUrls: ['./citas-en-proceso.component.scss'],
})
export class CitasEnProcesoComponent implements OnInit {
  @Input() citasEnProceso: any[] = [];
  @Output() citaFinalizada = new EventEmitter<any>();

  intervalos: Map<number, any> = new Map();

  ngOnInit() {
    this.iniciarContadores();
  }

  iniciarContadores() {
    this.citasEnProceso.forEach(cita => {
      const tiempoGuardado = localStorage.getItem(`cita_${cita.id}_tiempo`);
      
      if (tiempoGuardado && !this.intervalos.has(cita.id)) {
        cita.tiempoInicio = parseInt(tiempoGuardado, 10);
        this.actualizarTiempo(cita);
        this.intervalos.set(cita.id, setInterval(() => {
          this.actualizarTiempo(cita);
        }, 1000));
      }
    });
  }

  actualizarTiempo(cita: any) {
    const tiempoActual = Date.now();
    const tiempoTranscurrido = Math.floor((tiempoActual - cita.tiempoInicio) / 1000);

    const minutos = Math.floor(tiempoTranscurrido / 60);
    const segundos = tiempoTranscurrido % 60;

    cita.tiempoFormato = `${this.pad(minutos)}:${this.pad(segundos)}`;
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  finalizarCita(cita: any) {
    if (this.intervalos.has(cita.id)) {
      clearInterval(this.intervalos.get(cita.id));
      this.intervalos.delete(cita.id);
    }

    cita.estado = 'Finalizado';
    cita.duracionTotal = cita.tiempoFormato;

    localStorage.removeItem(`cita_${cita.id}_tiempo`);
    localStorage.removeItem(`cita_${cita.id}_estado`);

    this.citaFinalizada.emit(cita);
  }
}
