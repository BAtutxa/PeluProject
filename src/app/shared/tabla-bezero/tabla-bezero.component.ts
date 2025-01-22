import { Input, Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-tabla-bezero',
  templateUrl: './tabla-bezero.component.html',
  styleUrls: ['./tabla-bezero.component.scss'],
})
export class TablaBezeroComponent implements OnInit {

  @Input() alumnos: { nombre: string; apellido: string; edad: number }[] = [];
  fichaAbierto = false;
  alumnoSeleccionado: any = null;

  constructor() {}

  ngOnInit() {}
  verFicha(alumno: any) {
    console.log('Alumno seleccionado:', alumno);
    this.alumnoSeleccionado = alumno;
    this.fichaAbierto = true;
  }

}
