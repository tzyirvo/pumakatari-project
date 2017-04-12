import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../body/components/inicio/inicio.component';
import { RutasComponent } from '../body/components/rutas/rutas.component';
import { ParadasComponent } from '../body/components/paradas/paradas.component';
import { ParadaMasCercanaComponent } from '../body/components/parada-mas-cercana/parada-mas-cercana.component';
import { ProximoBusComponent } from '../body/components/proximo-bus/proximo-bus.component';
import { MapaComponent } from '../body/components/mapa/mapa.component';
import { ContactanosComponent } from '../body/components/contactanos/contactanos.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'rutas',
    component: RutasComponent
  },
  {
    path: 'paradas',
    component: ParadasComponent
  },
  {
    path: 'parada-mas-cercana',
    component: ParadaMasCercanaComponent
  },
  {
    path: 'proximo-bus',
    component: ProximoBusComponent
  },
  {
    path: 'mapa',
    component: MapaComponent
  },
  {
    path: 'contactanos',
    component: ContactanosComponent
  }
  //{
  //  path: 'landing',
  //  children: [
  //    {
  //      path: '',
  //      loadChildren: './landing/landing.module#LandingModule',
  //    },
  //    {
  //      path: '**',
  //      pathMatch: 'full',
  //      redirectTo: ''
  //    }
  //  ]
  //},
  //{
  //  path: 'error',
  //  component: AwSnapComponent
  //},
  //{
  //  path: '**',
  //  redirectTo: 'landing',
  //  pathMatch: 'full'
  //}
];

const appRouting = RouterModule.forRoot(appRoutes, {
  useHash: true
});

@NgModule({
  imports: [ appRouting ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
