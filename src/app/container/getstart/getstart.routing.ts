import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import {GetstartIndexComponent} from "./index/index.component";
const routes: Routes = [
  {
    path: '',
    component: GetstartIndexComponent,
    data: {
      title: 'about '
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetstartRoutingModule {}
