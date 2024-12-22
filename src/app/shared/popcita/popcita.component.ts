import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popcita',
  templateUrl: './popcita.component.html',
  styleUrls: ['./popcita.component.scss'],
})
export class PopcitaComponent  implements OnInit {
  currentDate: string; // Variable para almacenar la fecha actual
  availableHours: string[]; // Lista de horarios disponibles
  selectedHour: string; // Horario seleccionado por el usuario

  constructor() {
    // Inicializa la fecha actual en formato ISO
    const today = new Date();
    this.currentDate = today.toISOString();

    // Inicializar variables de horario
    this.availableHours = this.generateHours(); // Generar horarios disponibles
    this.selectedHour = ''; // Inicialmente vacío
  }

  ngOnInit() {
    console.log('Fecha actual inicializada:', this.currentDate);
  }

  // Método para manejar el cambio de fecha
  onDateChange(event: any) {
    console.log('Fecha seleccionada:', event.detail.value);
    this.currentDate = event.detail.value; // Actualizar la fecha actual con la nueva seleccionada
  }

  // Generar una lista de horarios cada 30 minutos
  private generateHours(): string[] {
    const hours = [];
    for (let i = 10; i <= 14; i++) {
      // Horas de 8:00 a 14:00
      hours.push(`${i.toString().padStart(2, '0')}:00`);
      hours.push(`${i.toString().padStart(2, '0')}:30`);

    }
    return hours;
  }

  // Manejar cambios en el horario seleccionado
  onHourChange(event: any) {
    console.log('Horario seleccionado:', event.detail.value);
    this.selectedHour = event.detail.value;
  }
}