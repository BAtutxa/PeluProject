import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HitzorduakService } from 'src/app/service/hitzorduak.service';
import { InfoCitaComponent } from 'src/app/shared/info-cita/info-cita.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  hours: string[] = [];
  citas: any[] = [];

  constructor(private modalController: ModalController, private hitzorduakService: HitzorduakService) {
    this.generateHours();
  }

  ngOnInit() {
    this.cargarCitas();
  }

  cargarCitas() {
    this.hitzorduakService.getHitzorduak().subscribe(
      (data) => {
        this.citas = data.map(cita => ({
          id: cita?.id ?? 0,
          izena: cita?.izena ?? 'Sin nombre',
          deskribapena: cita?.deskribapena ?? 'Sin descripción',
          hasieraOrdua: cita?.hasieraOrdua ?? '',
          estado: 'Pendiente' // Default state
        }));
        console.log('Citas cargadas:', this.citas);
      },
      (error) => {
        console.error('Error al cargar citas:', error);
      }
    );
  }

  async abrirInfoCita(citaSeleccionada: any) {
    const modal = await this.modalController.create({
      component: InfoCitaComponent,
      cssClass: 'custom-modal-class',
      componentProps: {
        cita: citaSeleccionada // Pasar solo la cita seleccionada
      }
    });

    return await modal.present();
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
    let minuteStr = minute === 0 ? '00' : `${minute}`;
    return `${hourStr}:${minuteStr}`;
  }
}
