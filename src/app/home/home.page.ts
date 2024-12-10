import { Component, HostListener, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isDarkMode: boolean = false;
  isMobile: boolean = false; // Para detectar si es móvil

  constructor() {}

  ngOnInit() {
    this.checkScreenSize(); // Comprueba el tamaño de pantalla al iniciar la página
  }

  // Método para alternar el modo oscuro
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  // Detecta el cambio de tamaño de la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize(); // Actualiza el estado de isMobile al cambiar el tamaño
  }

  // Verifica si es una pantalla móvil
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; 
  }
}
