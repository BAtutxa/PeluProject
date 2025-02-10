import { Component, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-popcita',
  templateUrl: './popcita.component.html',
  styleUrls: ['./popcita.component.scss'],
})
export class PopcitaComponent {
  @Output() citaAñadida = new EventEmitter<any>();

  servicios: any[] = []; // Aquí se almacenarán los servicios obtenidos desde la API

  currentDate: string = new Date().toISOString();
  availableHours: string[] = [
    '10:00', '10:30',
    '11:00', '11:30',
    '12:00', '12:30',
    '13:00', '13:30',
    '14:00'
  ];

  // Cita con valores predeterminados para evitar errores en el backend
  cita = {
    izena: '',
    telefonoa: '',
    etxekoa: 'E', // Valor por defecto
    data: '',
    hasieraOrdua: '',
    amaieraOrdua: null, // Permitimos null como valor predeterminado
    deskribapena: '',
    eserlekua: 0, // Valor por defecto
    prezioTotala: 0.0, // Valor por defecto
    sortzeData: new Date().toISOString(),
    hasieraOrduaErreala: null,
    amaieraOrduaErreala: null
  };

  constructor(private modalCtrl: ModalController ,private http: HttpClient) {}

  ngOnInit() {
    this.loadServicios(); // Cargar servicios al iniciar
  }
  cambiarFecha(event: any) {
    this.cita.data = event.detail.value.split('T')[0]; // Formato YYYY-MM-DD
  }

  cambioHoraInicio(event: any) {
    this.cita.hasieraOrdua = event.detail.value;
  }

  cambioHoraFinal(event: any) {
    this.cita.amaieraOrdua = event.detail.value || null;
  }

  toggleEtxekoa(isChecked: boolean) {
    this.cita.etxekoa = isChecked ? 'E' : 'K';
  }

  // Cargar los servicios desde la API
  loadServicios() {
    this.http.get<any[]>('http://localhost:8080/zerbitzuak').subscribe({
      next: (data) => {
        console.log("✅ Servicios cargados desde la API:", data);
        this.servicios = data.map(s => s.izena); // Asumimos que `izena` es el nombre del servicio
      },
      error: (err) => {
        console.error("❌ Error al cargar servicios:", err);
      }
    });
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

    // Validación del teléfono (número de 9 dígitos)
    if (this.cita.telefonoa.length !== 9 || isNaN(Number(this.cita.telefonoa))) {
      alert('Ingrese un número de teléfono válido de 9 dígitos.');
      return;
    }

    // Enviar la cita con todos los campos, asegurando que no haya valores nulos inesperados
    const citaFormateada = {
      izena: this.cita.izena.trim(),
      telefonoa: this.cita.telefonoa.trim(),
      etxekoa: this.cita.etxekoa || 'E',
      data: this.cita.data,
      hasieraOrdua: this.cita.hasieraOrdua,
      amaieraOrdua: this.cita.amaieraOrdua || null,
      deskribapena: this.cita.deskribapena ? this.cita.deskribapena.trim() : '',
      eserlekua: this.cita.eserlekua || 0,
      prezioTotala: this.cita.prezioTotala || 0.0,
      sortzeData: this.cita.sortzeData || new Date().toISOString(),
      hasieraOrduaErreala: null,
      amaieraOrduaErreala: null
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
      amaieraOrdua: null,
      deskribapena: '',
      eserlekua: 0,
      prezioTotala: 0.0,
      sortzeData: new Date().toISOString(),
      hasieraOrduaErreala: null,
      amaieraOrduaErreala: null
    };
  }
}
