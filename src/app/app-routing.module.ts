import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { HomeComponent } from './pages/home/home.component';
import { RequestLogComponent } from './pages/request-log/request-log.component';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: 'register',
    component: RegisterComponent // Separate route object for 'register'
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'request-log',
    component: RequestLogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
