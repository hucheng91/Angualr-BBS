import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import {SettingIndexComponent} from "./index/index.component";
const routes: Routes = [
  {
    path: '',
    component: SettingIndexComponent,
    data: {
      title: 'setting '
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
