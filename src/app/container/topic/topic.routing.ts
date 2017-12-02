import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {CreateComponent} from './create/create.component';
import {IndexComponent} from "./index/index.component";
const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: 'topic'
    }
  },
  {
    path: 'list',
    component: ListComponent,
    data: {
      title: 'list'
    }
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    data: {
      title: 'detail'
    }
  },
  {
    path: 'create',
    component: CreateComponent,
    data: {
      title: 'create'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule {}
