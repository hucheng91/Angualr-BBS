import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import {AboutIndexComponent} from "./index/index.component";
const routes: Routes = [
  {
    path: '',
    component: AboutIndexComponent,
    data: {
      title: 'about '
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {}
