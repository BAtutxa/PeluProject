import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoCitaComponent } from 'src/app/shared/Agenda/info-cita/info-cita.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  hours: string[] = []; // Horas de la agenda (10:00 - 15:00)
  citasPorHora: Map<string, any[]> = new Map(); // Citas agrupadas por hora
  alturaPorMediaHora = 50; // Altura en píxeles para 30 minutos
  citas: any[] = []; // Lista de todas las citas
  citasEnProceso: any[] = []; // Citas que están en proceso
  grupos: any[] = []; // Lista de grupos
  trabajadores: any[] = []; // Lista de trabajadores
  personasDisponiblesPorHora: Map<string, number> = new Map(); // Trabajadores disponibles por hora

  constructor(private modalController: ModalController, private http: HttpClient) {
    this.generateHours(); // Generar las horas de la agenda
  }

  ngOnInit() {
    this.loadGruposYTrabajadores(); // Cargar grupos y trabajadores al iniciar
  }

  // Generar las horas de 10:00 a 15:00
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

  // Formatear hora y minuto
  formatHour(hour: number, minute: number): string {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }

  // Calcular la altura de la cita basada en su duración
  calcularAltura(duracion: number): string {
    if (!duracion || duracion < 30) return `${this.alturaPorMediaHora}px`;
    return `${(duracion / 30) * this.alturaPorMediaHora}px`;
  }

  // Calcular la posición de la cita en la agenda
  calcularPosicion(horaInicio: string): string {
    let minutosDesdeInicio = this.convertirHoraAMinutos(horaInicio) - this.convertirHoraAMinutos("10:00");
    return `${(minutosDesdeInicio / 30) * this.alturaPorMediaHora}px`;
  }

  // Calcular la columna para la cita
  calcularColumna(cita: any): string {
    let index = this.citas.indexOf(cita) % 3;
    let spacing = 220;
    return `${index * spacing}px`;
  }

  // Convertir hora a minutos
  convertirHoraAMinutos(hora: string): number {
    if (!hora || !hora.includes(":")) return NaN;
    let [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
  }

  // Formatear la hora desde el backend
  formatHourFromBackend(hour: string): string {
    if (!hour) return "";
    let parts = hour.split(":");
    return parts.length >= 2 ? `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}` : "";
  }

  // Actualizar las citas
  actualizarCitas(citasRecibidas: any[]) {
    this.citasPorHora.clear();
    this.citas = [];

    citasRecibidas.forEach((cita) => {
      if (!cita.hasieraOrdua) return;

      let horaInicio = this.formatHourFromBackend(cita.hasieraOrdua);
      let maxPersonas = this.personasDisponiblesPorHora.get(horaInicio) || 0;

      if (this.citasPorHora.has(horaInicio) && this.citasPorHora.get(horaInicio)!.length >= maxPersonas) {
        console.warn(`⚠️ No se pueden agregar más citas a las ${horaInicio}, ya están ocupados todos los trabajadores.`);
        return;
      }

      let horaFin = this.formatHourFromBackend(cita.amaieraOrdua);
      let duracion = this.calcularDuracion(horaInicio, horaFin);
      cita.duracion = duracion;

      if (!this.citasPorHora.has(horaInicio)) {
        this.citasPorHora.set(horaInicio, []);
      }

      this.citasPorHora.get(horaInicio)!.push(cita);
      this.citas.push(cita);
    });
  }

  // Actualizar citas en proceso
  actualizarCitas2(citaFinalizada: any) {
    this.citas = this.citas.map(c => c.id === citaFinalizada.id ? citaFinalizada : c);
    this.citasEnProceso = this.citasEnProceso.filter(c => c.id !== citaFinalizada.id);
  }

  // Calcular la duración de la cita
  calcularDuracion(horaInicio: string, horaFin: string): number {
    if (!horaInicio) return 30;
    let minutosInicio = this.convertirHoraAMinutos(horaInicio);
    let minutosFin = this.convertirHoraAMinutos(horaFin);
    if (isNaN(minutosInicio) || isNaN(minutosFin)) return 30;
    return Math.max(minutosFin - minutosInicio, 30);
  }

  // Abrir el modal de información de la cita
  async abrirInfoCita(citaSeleccionada: any) {
    const modal = await this.modalController.create({
      component: InfoCitaComponent,
      cssClass: "custom-modal-class",
      componentProps: { cita: citaSeleccionada }
    });
    return await modal.present();
  }

  // Cargar grupos y trabajadores
  loadGruposYTrabajadores() {
    this.http.get<any[]>('http://localhost:8080/taldeak').subscribe({
      next: (gruposData) => {
        this.grupos = gruposData;
        this.loadTrabajadores();
      },
      error: (err) => console.error("❌ Error al cargar los grupos:", err)
    });
  }

  // Cargar trabajadores
  loadTrabajadores() {
    this.http.get<any[]>('http://localhost:8080/langileak').subscribe({
      next: (trabajadoresData) => {
        this.trabajadores = trabajadoresData;
        this.calcularPersonasDisponibles();
      },
      error: (err) => console.error("❌ Error al cargar los trabajadores:", err)
    });
  }

  // Calcular las personas disponibles por hora
  calcularPersonasDisponibles() {
    this.personasDisponiblesPorHora.clear();

    // Inicializar el mapa con horas de trabajo (de 10:00 a 15:00)
    this.hours.forEach(hora => this.personasDisponiblesPorHora.set(hora, 0));

    // Contar cuántos trabajadores están disponibles en cada hora
    this.trabajadores.forEach(trabajador => {
      if (!trabajador.horario || !trabajador.taldeak?.kodea) return;

      let horaInicio = this.formatHourFromBackend(trabajador.horario.inicio);
      let horaFin = this.formatHourFromBackend(trabajador.horario.fin);

      this.hours.forEach(hora => {
        if (hora >= horaInicio && hora < horaFin) {
          let cantidadActual = this.personasDisponiblesPorHora.get(hora) || 0;
          this.personasDisponiblesPorHora.set(hora, cantidadActual + 1);
        }
      });
    });
  }
}