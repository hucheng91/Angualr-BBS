import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AboutIndexComponent} from "./index/index.component";
import {AboutRoutingModule} from "./about..routing";
import {ComponentsModule} from "../../components/components.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AboutRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  declarations: [
    AboutIndexComponent
  ]
})
export class AboutModule { }
