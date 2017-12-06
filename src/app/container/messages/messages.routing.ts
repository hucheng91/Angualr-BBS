import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import {MessageIndexComponent} from "./index/index.component";
const routes: Routes = [
  {
    path: '',
    component: MessageIndexComponent,
    data: {
      title: '个人消息'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule {}
