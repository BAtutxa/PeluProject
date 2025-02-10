import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-cita',
  templateUrl: './info-cita.component.html',
  styleUrls: ['./info-cita.component.scss'],
})
export class InfoCitaComponent {
  @Input() cita: any;

  timer: any;
  tiempoTranscurrido = 0;
  tiempoFormato = '00:00';

  constructor(private modalController: ModalController) {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  startTimer() {
    if (this.timer) {
      return; // Evita múltiples temporizadores
    }

    this.cita.estado = 'En proceso';
    this.timer = setInterval(() => {
      this.tiempoTranscurrido++;
      this.tiempoFormato = this.formatTime(this.tiempoTranscurrido);
    }, 1000);
  }

  finalizarServicio() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.cita.estado = 'Finalizado';
      this.cita.duracionTotal = this.tiempoFormato;
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}
