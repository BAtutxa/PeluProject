import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopcitaComponent } from '../../modals/popcita/popcita.component';
import { HttpClient } from '@angular/common/http';
import { InfoCitaComponent } from '../../Agenda/info-cita/info-cita.component';
@Component({
  selector: 'app-barra-control',
  templateUrl: './barra-control.component.html',
  styleUrls: ['./barra-control.component.scss'],
})
export class BarraControlComponent implements OnInit {
  @Output() citasActualizadas = new EventEmitter<any[]>(); // Enviar citas a la agenda

  grupos: any[] = [];
  trabajadores: any[] = [];
  trabajadoresFiltrados: any[] = [];
  hitzorduak: any[] = []; // Citas del día

  grupoSeleccionado: any = null;
  trabajadorSeleccionado: string = '';

  fechaActual: string = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {
    this.cargarGrupos();
    this.cargarCitas();
  }
  async abrirInfoCita(cita: any) {
  const modal = await this.modalCtrl.create({
    component: InfoCitaComponent,
    cssClass: 'custom-modal',
    componentProps: {
      cita: cita,
      grupoSeleccionado: this.grupoSeleccionado // Pasamos el grupo del día
    }
  });

  return await modal.present();
}


  cargarGrupos() {
    this.http.get<any[]>('http://localhost:8080/taldeak').subscribe({
      next: (data) => {
        this.grupos = data;
        this.asignarGrupoPorDia();
      },
      error: (err) => console.error("❌ Error al cargar los grupos:", err)
    });
  }

  cargarTrabajadores() {
    this.http.get<any[]>('http://localhost:8080/langileak').subscribe({
      next: (data) => {
        this.trabajadores = data;
        this.filtrarTrabajadores();
      },
      error: (err) => console.error("❌ Error al cargar los trabajadores:", err)
    });
  }

  cargarCitas() {
    this.http.get<any[]>('http://localhost:8080/hitzorduak').subscribe({
      next: (data) => {
        this.hitzorduak = data.filter(cita => cita.data === this.fechaActual);
        this.citasActualizadas.emit(this.hitzorduak); // Enviar citas filtradas a Home
      },
      error: (err) => console.error("❌ Error al cargar las citas:", err)
    });
  }

  asignarGrupoPorDia() {
    const fecha = new Date(this.fechaActual);
    const diaSemana = fecha.getDay(); // Lunes=1, Viernes=5

    if (diaSemana === 0 || diaSemana === 6) {
      this.grupoSeleccionado = null; // No hay grupo el fin de semana
    } else {
      const indiceGrupo = diaSemana - 1;
      if (this.grupos.length > indiceGrupo) {
        this.grupoSeleccionado = this.grupos[indiceGrupo];
        this.cargarTrabajadores();
      }
    }
  }

  filtrarTrabajadores() {
    if (this.grupoSeleccionado) {
      this.trabajadoresFiltrados = this.trabajadores.filter(trabajador => trabajador.taldeak?.kodea === this.grupoSeleccionado.kodea);
    } else {
      this.trabajadoresFiltrados = [];
    }
  }

  retrocederFecha() {
    const fecha = new Date(this.fechaActual);
    fecha.setDate(fecha.getDate() - 1);
    this.fechaActual = fecha.toISOString().split('T')[0];
    this.asignarGrupoPorDia();
    this.cargarCitas();
  }

  avanzarFecha() {
    const fecha = new Date(this.fechaActual);
    fecha.setDate(fecha.getDate() + 1);
    this.fechaActual = fecha.toISOString().split('T')[0];
    this.asignarGrupoPorDia();
    this.cargarCitas();
  }

  async abrirPopup() {
    const modal = await this.modalCtrl.create({
      component: PopcitaComponent,
      cssClass: 'custom-modal',
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.agregarCita(result.data);
        this.cargarCitas();
      }
    });

    await modal.present();
  }

  agregarCita(event: any) {
    this.hitzorduak.push(event);
    this.citasActualizadas.emit(this.hitzorduak);
  }
}
