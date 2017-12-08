import { Component, OnInit, AfterViewInit } from '@angular/core';
import {CommonConstants} from "../../../constants/common-constant";
import {TopicService} from "../../../services/topic.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../commonModule/services/alert.service";
import {UserService} from "../../../services/user.service";
import * as $ from 'jquery';
@Component({
  selector: 'app-topic-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit,AfterViewInit {


  actionOperate: string = "create";   // 创建或者编辑
  errorMessage: string;
  tabTypes =  CommonConstants.TABS_TYPE;
  topic: any =  {tab:"",title: "",t_content:""};
  editor
  constructor(private topicServcie: TopicService,
              private  router: Router,
              private  alertService: AlertService,
              private  userServcie: UserService
  ) { }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log((<any>window).Editor());
      (<any>window).topic_editor = new  (<any>window).Editor();
      (<any>window).topic_editor.render($('.editor')[0]);
    },1000)

  }
  save($t_content) {
    // todo ngModel 绑定 拿不到content
    this.topic.t_content = (<any>window).topic_editor.codemirror.getValue();
    this.topicServcie.saveTopic(this.topic).subscribe((res) => {
      this.alertService.success("","保存成功!");
      setTimeout(() => {
        this.userServcie.triggerUserSu({user: res.data, isLogin: true}); // 通知 右侧更新用户信息，积分信息
      } ,100)
      this.router.navigate(["/topic"])
    });
  }
}
