import { BarraNavegacionComponent } from '../shared/barra-navegacion/barra-navegacion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router'; 





@NgModule({
  declarations: [
    BarraNavegacionComponent,NavBarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule

  ],
  exports:[
    BarraNavegacionComponent,
    NavBarComponent
  ]
})
export class SharedModule { }
