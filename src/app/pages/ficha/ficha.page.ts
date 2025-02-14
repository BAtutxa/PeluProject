import { Bezeroa } from './../../service/ficha.service';
import { Component, OnInit } from '@angular/core';
import { FichaService } from 'src/app/service/ficha.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit {
  listaBezeroa: any[]=[];

  constructor(private ficha:FichaService) {}
  ngOnInit() {

    this.getBezeroak();
  }

  getBezeroak() {
    this.ficha.getBezeroak().subscribe(
      (data) => {
        this.listaBezeroa = data; // Asigna los datos a la variable listaBezeroa
      },
      (error) => {
        console.error('Error al obtener bezeroak', error);
      }
    );
  }
  
}
