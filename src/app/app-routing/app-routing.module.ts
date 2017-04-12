import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../body/components/inicio/inicio.component';
import { RutasComponent } from '../body/components/rutas/rutas.component';
import { RutasCrearComponent } from '../body/components/rutas-crear/rutas-crear.component';
import { RutasModificarComponent } from '../body/components/rutas-modificar/rutas-modificar.component';
import { RutasEliminarComponent } from '../body/components/rutas-eliminar/rutas-eliminar.component';
import { ParadasComponent } from '../body/components/paradas/paradas.component';
import { ParadasCrearComponent } from '../body/components/paradas-crear/paradas-crear.component';
import { ParadasModificarComponent } from '../body/components/paradas-modificar/paradas-modificar.component';
import { ParadasEliminarComponent } from '../body/components/paradas-eliminar/paradas-eliminar.component';
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
    path: 'crear-rutas',
    component: RutasCrearComponent
  },
  {
    path: 'modificar-rutas',
    component: RutasModificarComponent
  },
  {
    path: 'eliminar-rutas',
    component: RutasEliminarComponent
  },
  {
    path: 'paradas',
    component: ParadasComponent
  },
  {
    path: 'crear-paradas',
    component: ParadasCrearComponent
  },
  {
    path: 'modificar-paradas',
    component: ParadasModificarComponent
  },
  {
    path: 'eliminar-paradas',
    component: ParadasEliminarComponent
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
