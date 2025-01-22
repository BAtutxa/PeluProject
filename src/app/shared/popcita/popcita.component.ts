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
  availableHours: string[] = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM']; // Aqui mirar a ver que horas son las necesarias de agregar a la hora de coger citas

  cita = { // Pensar y configurar todos los atributos a la hora de agregar una cita 
    izena: '',
    data: '',
    hasieraOrdua: '',
    deskribapena: ''
  };

  constructor(private modalCtrl: ModalController) {}

  cambiarFecha(event: any) {
    this.cita.data = event.detail.value;
  }

  cambioHora(event: any) {
    this.cita.hasieraOrdua = event.detail.value;
  }

  toggleService(service: string, isChecked: boolean) {
    if (isChecked) {
      if (!this.cita.deskribapena.includes(service)) {
        this.cita.deskribapena = this.cita.deskribapena
          ? `${this.cita.deskribapena}, ${service}`
          : service;
      }
    } else {
      // Eliminar el servicio seleccionado correctamente
      const servicios = this.cita.deskribapena.split(', ').filter(s => s !== service);
      this.cita.deskribapena = servicios.join(', ');
    }
  }

anadirCita() {
  if (!this.cita.izena || !this.cita.data || !this.cita.hasieraOrdua) {
    alert('Por favor, complete todos los campos obligatorios.');
    return;
  }

  const citaFormateada = {
    izena: this.cita.izena,
    data: this.cita.data.split('T')[0],  
    hasieraOrdua: this.cita.hasieraOrdua,
    deskribapena: this.cita.deskribapena.trim(),
  };

  console.log('Cita a enviar:', citaFormateada);  // Depuración
  this.citaAñadida.emit(citaFormateada);
  this.modalCtrl.dismiss(citaFormateada);
}

  cerrarModal() {
    this.modalCtrl.dismiss(); // Cerrar el modal sin enviar datos
  }

  resetForm() {
    this.cita = {
      izena: '',
      data: '',
      hasieraOrdua: '',
      deskribapena: ''
    };
  }
}
