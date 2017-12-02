import {Component, Input, OnInit} from '@angular/core';
import {TopicService} from "../../services/topic.service";

@Component({
  selector: 'app-no-reply-topic',
  templateUrl: './no-reply-topic.component.html',
  styleUrls: ['./no-reply-topic.component.css']
})
export class NoReplyTopicComponent implements OnInit {
  @Input()
  noReplyTopics: any [];

  @Input()
   title: string = "无人回复的话题";

  _noReplyTopics: any;
  constructor() { }

  ngOnInit() {
    this._noReplyTopics = this.noReplyTopics;
     // this.topicService.getNoReplyTopics().subscribe( res => {
     //   this.noReplyTopics = res;
     // });
  }


}
