import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SettingIndexComponent} from "./index/index.component";
import {SettingRoutingModule} from "./setting.routing";
import {ComponentsModule} from "../../components/components.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SettingRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  declarations: [
    SettingIndexComponent
  ]
})
export class SettingModule { }
