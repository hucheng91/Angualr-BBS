import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserInformationComponent} from "./user-information/user-information.component";
import {NoReplyTopicComponent} from "./no-reply-topic/no-reply-topic.component";
import {TopStarComponent} from "./top-star/top-star.component";
import {FriendbbsComponent} from "./friendbbs/friendbbs.component";
import { MdEditorComponent } from './md-editor/md-editor.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    UserInformationComponent,
    NoReplyTopicComponent,
    TopStarComponent,
    FriendbbsComponent,
    MdEditorComponent
  ],
  exports: [
    UserInformationComponent,
    NoReplyTopicComponent,
    TopStarComponent,
    FriendbbsComponent,
    MdEditorComponent
  ]
})
export class ComponentsModule { }
