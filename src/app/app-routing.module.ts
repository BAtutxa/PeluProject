import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./pages/agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'ficha',
    loadChildren: () => import('./pages/ficha/ficha.module').then( m => m.FichaPageModule)
  },
  {
    path: 'trabajadores',
    loadChildren: () => import('./pages/trabajadores/trabajadores.module').then( m => m.TrabajadoresPageModule)
  },
  {
    path: 'control-stock',
    loadChildren: () => import('./pages/control-stock/control-stock.module').then( m => m.ControlStockPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
