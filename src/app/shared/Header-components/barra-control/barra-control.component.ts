import { Component, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopcitaComponent } from '../../modals/popcita/popcita.component';


@Component({
  selector: 'app-barra-control',
  templateUrl: './barra-control.component.html',
  styleUrls: ['./barra-control.component.scss'],
})
export class BarraControlComponent {

  constructor(private modalCtrl: ModalController){}


  @Output() citaAñadida = new EventEmitter<any>();
  mostrarPopcita = false;
  fechaActual: string = new Date().toISOString().split('T')[0];

  async abrirPopup() {
    const modal = await this.modalCtrl.create({
      component: PopcitaComponent,
      cssClass: 'custom-modal',
        
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.agregarCita(result.data);
      }
    });

    await modal.present();
  }

  agregarCita(event: any) {
    this.citaAñadida.emit(event); 
    this.mostrarPopcita = false; 
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
