import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//import { InicioComponent } from './body/components/inicio/inicio.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  //},
  //{
  //  path: 'inicio',
  //  component: InicioComponent
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
