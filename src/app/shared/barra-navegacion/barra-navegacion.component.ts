import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.scss'],
})
export class BarraNavegacionComponent  implements OnInit {



  constructor(private router: Router) {}

  

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}