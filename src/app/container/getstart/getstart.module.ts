import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GetstartIndexComponent} from "./index/index.component";
import {GetstartRoutingModule} from "./getstart.routing";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    GetstartRoutingModule,
    ComponentsModule
  ],
  declarations: [
    GetstartIndexComponent
  ]
})
export class GetstartModule { }
