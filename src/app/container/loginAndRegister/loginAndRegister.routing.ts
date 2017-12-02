import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";


import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'login'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'register'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginAndRegisterRoutingModule {}
