import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
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
