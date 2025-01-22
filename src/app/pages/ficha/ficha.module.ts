import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FichaPageRoutingModule } from './ficha-routing.module';
import { FichaPage } from './ficha.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaPageRoutingModule,
    SharedModule
    
  ],
  declarations: [FichaPage]
})
export class FichaPageModule {}
