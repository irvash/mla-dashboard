import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainLayoutComponent} from "./shared/layout/main-layout/main-layout.component";
import {AppComponent} from "./app.component";
import {Page404Component} from "./pages/page404/page404.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
        data: {tile: 'خانه'}
      }
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'لاگین'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'ثبت نام'
    }
  },
  {path: '**', redirectTo: '404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
