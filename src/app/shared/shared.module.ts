import { BarraNavegacionComponent } from '../shared/barra-navegacion/barra-navegacion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router'; 
import { BoxListComponent } from '../shared/box-list/box-list.component';
import { BarraControlComponent } from '../shared/barra-control/barra-control.component';
import { PopcitaComponent } from '../shared/popcita/popcita.component';
import { TablaBezeroComponent } from '../shared/tabla-bezero/tabla-bezero.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BarraNavegacionComponent,
    NavBarComponent, 
    BoxListComponent, 
    BarraControlComponent,
    PopcitaComponent,
    TablaBezeroComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule

  ],
  exports:[
    BarraNavegacionComponent,
    NavBarComponent,
    BoxListComponent,
    BarraControlComponent,
    PopcitaComponent,
    TablaBezeroComponent
    
  ]
})
export class SharedModule { }
