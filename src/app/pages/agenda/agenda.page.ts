import { Component, OnInit } from '@angular/core';
import { HitzorduakService, Cita } from '../../service/hitzorduak.service';

@Component({
  selector: 'app-agendas',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})

export class AgendaPage implements OnInit {
  citas: Cita[] = [];

  services: any[] = [];  // Inicializado correctamente

  private timers: any[] = [];  // Para almacenar los intervalos de tiempo para cada servicio

  constructor(private hitzorduakService: HitzorduakService) {}

  ngOnInit() {
    this.cargarCitas();
  }

  // Método para obtener citas desde el backend
  cargarCitas() {
    this.hitzorduakService.getHitzorduak().subscribe(
      (data) => {
        this.citas = data;
        console.log('Citas cargadas:', this.citas);

        // Mapear las citas al formato de services
        this.services = this.citas.map(cita => ({
          id: cita.id,
          cliente: cita.izena,
          servicio: cita.deskribapena || 'Sin descripción',
          hora: cita.hasieraOrdua,
          estado: 'Pendiente',
          alumno: null,
          intervalo: false,
          tiempo: '00:00',
          duracionTotal: null
        }));
      },
      (error) => {
        console.error('Error al cargar citas:', error);
      }
    );
  }

  agregarCita(nuevaCita: any) {
    console.log('Cita recibida:', nuevaCita);  // Verificar si se recibe correctamente
    this.services.push({
      cliente: nuevaCita.izena,
      servicio: nuevaCita.deskribapena,
      hora: nuevaCita.hasieraOrdua,
      estado: 'Pendiente',
      alumno: null,
      intervalo: false,
      tiempo: '00:00',
      duracionTotal: null
    });
  }
  
  startTimer(index: number) {
    if (this.services[index].intervalo) {
      return;  // Si ya está en marcha, no hacer nada
    }

    this.services[index].intervalo = true;
    this.services[index].estado = 'En proceso';

    // Captura la hora actual como hora real de inicio
    const ahora = new Date();
    const horaReal = ahora.toTimeString().split(' ')[0].substring(0, 5); // Formato HH:mm

    // Llamar al backend para guardar la hora real de inicio
    this.hitzorduakService.updateHoraReal(this.services[index].id, horaReal).subscribe(
      () => {
        console.log('Hora real de inicio actualizada');
        this.services[index].hora = horaReal;
      },
      (error) => console.error('Error al actualizar hora real:', error)
    );

    let seconds = 0;
    this.timers[index] = setInterval(() => {
      seconds++;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      this.services[index].tiempo = `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
    }, 1000);
  }

  finalizarServicio(index: number) {
    if (!this.services[index].intervalo) {
      return;  // Si el temporizador no está en marcha, no hacer nada
    }

    clearInterval(this.timers[index]);
    this.services[index].intervalo = false;
    this.services[index].estado = 'Finalizado';
    this.services[index].duracionTotal = this.services[index].tiempo;

    // Capturar la hora actual cuando se finaliza el servicio
    const ahora = new Date();
    const horaFinalReal = ahora.toTimeString().split(' ')[0].substring(0, 5); // Formato HH:mm

    this.hitzorduakService.updateHoraFinalReal(this.services[index].id, horaFinalReal).subscribe( // llamamos al servicio para obetener la hora de finalizacion de la cita
      () => console.log('Hora real de finalización actualizada'),
      (error) => console.error('Error al actualizar hora real de finalización:', error)
    );

    console.log(`Servicio finalizado para ${this.services[index].cliente}, Duración total: ${this.services[index].duracionTotal}`);
  }

    onAlumnoChange(event: any, index: number) {
      this.services[index].alumno = event.detail.value;
    }

    // Formatear números de tiempo
    private pad(value: number): string {
      return value < 10 ? `0${value}` : value.toString();
    }
  }
