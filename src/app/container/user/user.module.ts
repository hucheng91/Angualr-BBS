import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserIndexComponent } from './index/index.component';
import {UserRoutingModule} from "./user.routing";
import {ComponentsModule} from "../../components/components.module";
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ListComponent} from "../topic/list/list.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    UserRoutingModule,
    ComponentsModule,
    SharedModule,
    ListComponent,
  ],
  declarations: [
    UserIndexComponent,
  ]
})
export class UserModule { }
