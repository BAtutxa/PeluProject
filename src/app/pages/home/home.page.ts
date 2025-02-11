import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoCitaComponent } from 'src/app/shared/Agenda/info-cita/info-cita.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  hours: string[] = [];
  citasPorHora: Map<string, any[]> = new Map();
  alturaPorMediaHora = 50; // 📏 Altura base en píxeles para 30 minutos
  citas: any[] = []; // Lista de citas

  constructor(private modalController: ModalController) {
    this.generateHours();
  }

  ngOnInit() {}

  /**
   * Calcula la altura de una cita basada en su duración.
   */
  calcularAltura(duracion: number): string {
    if (!duracion || duracion < 30) return `${this.alturaPorMediaHora}px`; // Mínimo 30 min
    return `${(duracion / 30) * this.alturaPorMediaHora}px`;
  }

  /**
   * Procesa las citas recibidas y las organiza por hora.
   */
  actualizarCitas(citasRecibidas: any[]) {
    this.citasPorHora.clear();
    this.citas = citasRecibidas; // Guardamos todas las citas

    citasRecibidas.forEach((cita) => {
      if (!cita.hasieraOrdua) return; // 🚨 Evita procesar citas sin hora de inicio

      let horaInicio = this.formatHourFromBackend(cita.hasieraOrdua);
      let horaFin = this.formatHourFromBackend(cita.amaieraOrdua);

      // 🔥 Calcular la duración en minutos
      let duracion = this.calcularDuracion(horaInicio, horaFin);

      // Agregar la duración al objeto cita
      cita.duracion = duracion;

      if (!this.citasPorHora.has(horaInicio)) {
        this.citasPorHora.set(horaInicio, []);
      }
      this.citasPorHora.get(horaInicio)?.push(cita);
    });

    console.log("📆 Citas organizadas con duración:", this.citasPorHora);
  }

  /**
   * Calcula la duración de la cita en minutos.
   */
  calcularDuracion(horaInicio: string, horaFin: string): number {
    if (!horaInicio) return 30; // Si no hay hora de inicio, duración predeterminada

    let minutosInicio = this.convertirHoraAMinutos(horaInicio);
    let minutosFin = this.convertirHoraAMinutos(horaFin);

    if (isNaN(minutosInicio) || isNaN(minutosFin)) return 30; // 🚨 Evita cálculos incorrectos
    return Math.max(minutosFin - minutosInicio, 30); // Duración mínima de 30 minutos
  }

  /**
   * Convierte una hora en formato `HH:mm` a minutos totales desde las 00:00.
   */
  convertirHoraAMinutos(hora: string): number {
    if (!hora || !hora.includes(":")) return NaN;
    let [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
  }

  /**
   * Asegura que `hasieraOrdua` del backend esté en formato `HH:mm`
   */
  formatHourFromBackend(hour: string): string {
    if (!hour) return "";
    let parts = hour.split(":");
    return parts.length >= 2 ? `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}` : "";
  }

  /**
   * Genera la lista de horas disponibles en la agenda.
   */
  generateHours() {
    let startHour = 10;
    let startMinute = 0;

    while (startHour < 15) {
      this.hours.push(this.formatHour(startHour, startMinute));
      startMinute += 30;
      if (startMinute === 60) {
        startMinute = 0;
        startHour++;
      }
    }
  }

  /**
   * Formatea la hora en `HH:mm`.
   */
  formatHour(hour: number, minute: number): string {
    return `${hour < 10 ? '0' + hour : hour}:${minute === 0 ? '00' : minute}`;
  }

  /**
   * Calcula la posición vertical de la cita en la agenda.
   */
  calcularPosicion(horaInicio: string): string {
    let minutosDesdeInicio = this.convertirHoraAMinutos(horaInicio) - this.convertirHoraAMinutos("10:00");
    return `${(minutosDesdeInicio / 30) * this.alturaPorMediaHora}px`;
  }

  /**
   * Calcula la columna donde se colocará la cita.
   */
  calcularColumna(cita: any): string {
    let index = this.citas.indexOf(cita) % 3; // Máximo 3 columnas antes de resetear
    let spacing = 220;
    return `${index * spacing}px`;
  }

  /**
   * Abre el modal de información de la cita.
   */
  async abrirInfoCita(citaSeleccionada: any) {
    const modal = await this.modalController.create({
      component: InfoCitaComponent,
      cssClass: "custom-modal-class",
      componentProps: {
        cita: citaSeleccionada
      }
    });

    return await modal.present();
  }
}
