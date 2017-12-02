import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import {UserIndexComponent} from "./index/index.component";
const routes: Routes = [
  {
    path: '',
    component: UserIndexComponent,
    data: {
      title: 'user'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
