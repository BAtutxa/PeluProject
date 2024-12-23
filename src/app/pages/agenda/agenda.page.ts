import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  services = [
    {
      cliente: 'Raul Gomez',
      alumno: '', // Sin asignar al inicio
      servicio: 'Corte de cabello',
      hora: '10:30 AM',
      estado: 'Pendiente', // Estado inicial
      tiempo: '00:00:00', // Tiempo inicial
      duracionTotal: '', // Duración total del servicio
      contador: false,
      intervalo: null as any, // Para almacenar el intervalo del cronómetro
      segundosTotales: 0, // Segundos totales del cronómetro
    },
  ];

  ngOnInit(): void {}

  // Cuando se asigna un alumno
  onAlumnoChange(event: any, index: number) {
    const alumnoSeleccionado = event.detail.value;
    this.services[index].alumno = alumnoSeleccionado;
    if (alumnoSeleccionado) {
      this.services[index].estado = 'Pendiente'; // Cambia el estado a pendiente
    }
  }

  // Iniciar el temporizador
  startTimer(index: number) {
    if (this.services[index].intervalo) {
      return; // Evitar reiniciar si ya está corriendo
    }

    // Configura el temporizador
    this.services[index].estado = 'En proceso';
    this.services[index].intervalo = window.setInterval(() => {
      this.services[index].segundosTotales++;
      const horas = Math.floor(this.services[index].segundosTotales / 3600);
      const minutos = Math.floor((this.services[index].segundosTotales % 3600) / 60);
      const segundosRestantes = this.services[index].segundosTotales % 60;

      this.services[index].tiempo = `${this.formatTime(horas)}:${this.formatTime(minutos)}:${this.formatTime(segundosRestantes)}`;
    }, 1000);
  }

  // Finalizar el servicio
  finalizarServicio(index: number) {
    if (this.services[index].intervalo !== null) {
      clearInterval(this.services[index].intervalo); // Detener el temporizador
    }

    // Calcular la duración total
    const horas = Math.floor(this.services[index].segundosTotales / 3600);
    const minutos = Math.floor((this.services[index].segundosTotales % 3600) / 60);
    const segundosRestantes = this.services[index].segundosTotales % 60;

    this.services[index].duracionTotal = `${this.formatTime(horas)}:${this.formatTime(minutos)}:${this.formatTime(segundosRestantes)}`;

    this.services[index].estado = 'Finalizado'; // Cambia el estado a Finalizado
    this.services[index].contador = false;
    this.services[index].intervalo = null; // Reinicia el intervalo
  }

  // Formatear el tiempo
  formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
