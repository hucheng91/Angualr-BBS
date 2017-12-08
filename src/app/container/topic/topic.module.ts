import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import {TopicRoutingModule} from "./topic.routing";
import {ComponentsModule} from "../../components/components.module";
import {SharedModule} from '../../shared/shared.module';
import {PaginationModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AdsComponent} from "../../components/ads/ads.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TopicRoutingModule,
    ComponentsModule,
    SharedModule,
    PaginationModule.forRoot()
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    CreateComponent,
    IndexComponent,
    AdsComponent

  ],
  exports: [ListComponent,AdsComponent]
})
export class TopicModule { }
