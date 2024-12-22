import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopcitaComponent } from '../popcita/popcita.component';


@Component({
  selector: 'app-barra-control',
  templateUrl: './barra-control.component.html',
  styleUrls: ['./barra-control.component.scss'],
})
export class BarraControlComponent implements OnInit {
  fechaActual: string='';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // fecha actual
    this.fechaActual = new Date().toISOString().split('T')[0];
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

  async abrirPopup() { //Metodo para abrir el componente de citas
    const modal = await this.modalCtrl.create({
      component: PopcitaComponent,
      cssClass: 'custom-modal', 

    });
    await modal.present();
  }
}
