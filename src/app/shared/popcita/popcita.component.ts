import { Component, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popcita',
  templateUrl: './popcita.component.html',
  styleUrls: ['./popcita.component.scss'],
})
export class PopcitaComponent {
  @Output() citaAñadida = new EventEmitter<any>();

  currentDate: string = new Date().toISOString();
  availableHours: string[] = [
    '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM',
    '12:00 AM', '12:30 PM',
    '13:00 PM', '13:30 PM',
    '14:00 PM'
  ];

  cita = {
    izena: '',
    telefonoa: '',
    etxekoa: 'E',
    data: '',
    hasieraOrdua: '',
    amaieraOrdua: '',
    deskribapena: '',
    eserlekua: 0, // Asiento predeterminado
    hasieraOrduaErreala: null,
    amaieraOrduaErreala: null,
    prezioTotala: 0.0, // Precio predeterminado
    sortzeData: ''
  };

  constructor(private modalCtrl: ModalController) {}

  cambiarFecha(event: any) {
    this.cita.data = event.detail.value.split('T')[0]; // Formato YYYY-MM-DD
  }

  cambioHoraInicio(event: any) {
    this.cita.hasieraOrdua = event.detail.value;
  }

  cambioHoraFinal(event: any) {
    this.cita.amaieraOrdua = event.detail.value;
  }

  toggleEtxekoa(isChecked: boolean) {
    this.cita.etxekoa = isChecked ? 'E' : 'K';
  }

  toggleService(service: string, isChecked: boolean) {
    if (isChecked) {
      if (!this.cita.deskribapena.includes(service)) {
        this.cita.deskribapena = this.cita.deskribapena
          ? `${this.cita.deskribapena}, ${service}`
          : service;
      }
    } else {
      const servicios = this.cita.deskribapena.split(', ').filter(s => s !== service);
      this.cita.deskribapena = servicios.join(', ');
    }
  }

  anadirCita() {
    if (!this.cita.izena || !this.cita.telefonoa || !this.cita.data || !this.cita.hasieraOrdua) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const citaFormateada = {
      izena: this.cita.izena,
      telefonoa: this.cita.telefonoa || '', // Valor por defecto si está vacío
      etxekoa: this.cita.etxekoa,
      data: this.cita.data,
      hasieraOrdua: this.cita.hasieraOrdua,
      amaieraOrdua: this.cita.amaieraOrdua || null,  // Permitir valor nulo
      deskribapena: this.cita.deskribapena.trim() || '',
      eserlekua: this.cita.eserlekua,
      hasieraOrduaErreala: null,
      amaieraOrduaErreala: null,
      prezioTotala: this.cita.prezioTotala,
      sortzeData: new Date().toISOString() // Fecha actual con hora
    };

    console.log('Cita a enviar:', citaFormateada);
    this.citaAñadida.emit(citaFormateada);
    this.modalCtrl.dismiss(citaFormateada);
  }

  cerrarModal() {
    this.modalCtrl.dismiss(); // Cerrar el modal sin enviar datos
  }

  resetForm() {
    this.cita = {
      izena: '',
      telefonoa: '',
      etxekoa: 'E',
      data: '',
      hasieraOrdua: '',
      amaieraOrdua: '',
      deskribapena: '',
      eserlekua: 0,
      hasieraOrduaErreala: null,
      amaieraOrduaErreala: null,
      prezioTotala: 0.0,
      sortzeData: ''
    };
  }
}
