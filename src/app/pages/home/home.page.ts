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
  citasPorHora: Map<string, any[]> = new Map(); // ✅ Inicializar correctamente el mapa de citas

  constructor(private modalController: ModalController) {
    this.generateHours();
  }

  ngOnInit() {}
  calcularAltura(duracion: number): string {
  let baseAltura = 50; // Altura base en píxeles para 30 minutos
  return `${(duracion / 30) * baseAltura}px`;
}

  actualizarCitas(citasRecibidas: any[]) {
    this.citasPorHora.clear(); // Limpiar antes de actualizar
  
    citasRecibidas.forEach((cita) => {
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
   * Calcula la duración de la cita en minutos
   */
  calcularDuracion(horaInicio: string, horaFin: string): number {
    if (!horaInicio || !horaFin) return 30; // Si no hay hora de fin, duración predeterminada de 30 minutos
  
    let [h1, m1] = horaInicio.split(":").map(Number);
    let [h2, m2] = horaFin.split(":").map(Number);
  
    let minutosInicio = h1 * 60 + m1;
    let minutosFin = h2 * 60 + m2;
  
    return Math.max(minutosFin - minutosInicio, 30); // Duración mínima de 30 minutos
  }
  

  /**
   * Asegura que `hasieraOrdua` del backend esté en formato `HH:mm`
   */
  formatHourFromBackend(hour: string): string {
    if (!hour) return ""; // ✅ Si no hay hora, devolver vacío
    let parts = hour.split(":");
    let formattedHour = `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}`;
    return formattedHour;
  }

  generateHours() {
    let startHour = 10;
    let startMinute = 0;

    while (startHour < 15) {
      let formattedHour = this.formatHour(startHour, startMinute);
      this.hours.push(formattedHour);

      startMinute += 30;
      if (startMinute === 60) {
        startMinute = 0;
        startHour++;
      }
    }
  }

  formatHour(hour: number, minute: number): string {
    let hourStr = hour < 10 ? `0${hour}` : `${hour}`;
    let minuteStr = minute === 0 ? "00" : `${minute}`;
    return `${hourStr}:${minuteStr}`;
  }

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
