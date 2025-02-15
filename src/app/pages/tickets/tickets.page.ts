import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage {
  cliente: string = '';
  alumno: string = '';
  servicios: string = '';
  precioFinal: number | null = null;

  constructor() {}

  generarPDF() {
    if (!this.cliente || !this.alumno || !this.servicios || this.precioFinal === null) {
      alert('❌ Por favor, llena todos los campos antes de generar el ticket.');
      return;
    }

    const doc = new jsPDF();

    // Cargar imagen
    const img = new Image();
    img.src = 'assets/fotos/IMP_Logotipoa.png';
    img.onload = () => {
      doc.addImage(img, 'PNG', 70, 10, 60, 20); // Centrar logo en la parte superior

      // Encabezado
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('TICKET DE SERVICIO', 60, 40);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');

      // Línea divisoria
      doc.line(20, 45, 190, 45);

      // Datos del ticket
      doc.text(`Cliente: ${this.cliente}`, 20, 55);
      doc.text(`Alumno: ${this.alumno}`, 20, 65);
      doc.text('Servicios:', 20, 75);
      
      // Servicios en varias líneas si es largo
      let serviciosArray = doc.splitTextToSize(this.servicios, 160);
      doc.text(serviciosArray, 20, 85);

      doc.text(`Precio Final: ${this.precioFinal}€`, 20, 110);

      // Línea final
      doc.line(20, 120, 190, 120);
      doc.text('Gracias por su compra.', 70, 130);

      // Guardar PDF
      doc.save(`ticket_${this.cliente}.pdf`);
    };
  }
}
