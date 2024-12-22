import { BarraNavegacionComponent } from '../shared/barra-navegacion/barra-navegacion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router'; 
import { BoxListComponent } from './box-list/box-list.component';
import { BarraControlComponent } from './barra-control/barra-control.component';
import { PopcitaComponent } from './popcita/popcita.component';





@NgModule({
  declarations: [
    BarraNavegacionComponent,NavBarComponent, BoxListComponent, BarraControlComponent,PopcitaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule

  ],
  exports:[
    BarraNavegacionComponent,
    NavBarComponent,
    BoxListComponent,
    BarraControlComponent,
    PopcitaComponent
  ]
})
export class SharedModule { }
