import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info-cita',
  templateUrl: './info-cita.component.html',
  styleUrls: ['./info-cita.component.scss'],
})
export class InfoCitaComponent implements OnInit {
  @Input() cita: any;
  alumnos: any[] = []; // Lista de alumnos filtrados
  timer: any;
  tiempoTranscurrido = 0;
  tiempoFormato = '00:00';

  constructor(private modalController: ModalController, private http: HttpClient) {}

  ngOnInit() {
    this.cargarAlumnos();
  }

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

  // 🔥 Cargar alumnos filtrados según el grupo del día
  cargarAlumnos() {
    if (!this.cita?.data) return; // Si no hay fecha, salir

    this.http.get<any[]>('http://localhost:8080/taldeak').subscribe((grupos) => {
      const grupoDelDia = this.obtenerGrupoPorFecha(this.cita.data, grupos);
      if (!grupoDelDia) return;

      this.http.get<any[]>('http://localhost:8080/langileak').subscribe((alumnos) => {
        this.alumnos = alumnos.filter(
          (alumno) => alumno.taldeak?.kodea === grupoDelDia.kodea
        );
      });
    });
  }
  onAlumnoSeleccionado() {
    console.log("👨‍🎓 Alumno seleccionado:", this.cita.alumno);
    if (this.cita.alumno) {
      this.cita.estado = 'Pendiente'; 
    }
  }

  obtenerGrupoPorFecha(fecha: string, grupos: any[]): any {
    const fechaObj = new Date(fecha);
    const diaSemana = fechaObj.getDay(); 

    if (diaSemana === 0 || diaSemana === 6) {
      return null; 
    }

    return grupos[diaSemana - 1]; 
}
}
