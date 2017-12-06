import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageIndexComponent } from './index/index.component';
import {ComponentsModule} from "../../components/components.module";
import {SharedModule} from '../../shared/shared.module';
import {PaginationModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MessagesRoutingModule} from "./messages.routing";
import {MessageListComponent} from "./message/list.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MessagesRoutingModule,
    ComponentsModule,
    SharedModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    MessageIndexComponent,
    MessageListComponent
  ],
  exports: []
})
export class MessagesModule { }
