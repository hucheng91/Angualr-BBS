import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {RouterModule} from "@angular/router";
import {LoginAndRegisterRoutingModule} from "./loginAndRegister.routing";
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoginAndRegisterRoutingModule
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class LoginAndRegisterModule { }
