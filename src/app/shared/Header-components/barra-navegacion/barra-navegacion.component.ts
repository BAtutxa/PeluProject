import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.scss'],
})
export class BarraNavegacionComponent  implements OnInit {



  constructor(private router: Router, private menuController: MenuController) {}

  

  ngOnInit() {
    this.menuController.open(); // metodo para que este abierto el menu por defecto
  }

  goToLogin() {
    this.router.navigate(['/login']); // metodo para salir de al login
  }
}