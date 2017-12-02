import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TopicService} from "../../../services/topic.service";
import {} from "rxjs/operator/switchMap";
import {UserService} from "../../../services/user.service";
import {Topic} from "../../../models/topic-model";
import {ReplayService} from "../../../services/replay.service";
import {AlertService} from "../../../commonModule/services/alert.service";
import {Editor} from "primeng/primeng";
import {RoutingUrl} from "../../../constants/routing-url-constant";
@Component({
  selector: 'app-topic-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit,AfterViewInit {



  headerLabel: string = "作者";
  topic: any = new Topic();
  replies: any;
  // topic
  noReplayTopic: any;
  topsTopic:any;
  isCollect: boolean;
  authorOtherTopics: any;
  authorOtherTopicTitle: string =  "作者其话题";


  //
  author: any;

  isLogin: boolean;

  current_user: any;

  allReplayNamesArry: any [];   // 所有回复的人


  reply2AreaRender$: any;  // 回答区域二回复





  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertServcie: AlertService,
    private topServcie: TopicService,
    private userService: UserService,
    private  replayServcie: ReplayService
  ) { }


  ngOnInit() {
    console.log(this.topic);
    this.isLogin = this.userService.isCUrrentUserLogin();
    this.current_user = this.userService.getCurentUser();
    this.route.paramMap.subscribe((params: ParamMap) => {
     this.initData(params.get('id'));
  });


  }
  initData(topicId: string) {
    this.topServcie.getTopic(topicId).subscribe((res: any) => {
      this.topic = res.topic;
      this.noReplayTopic = res.no_reply_topics;
      if(res.topic.author) {this.author = res.topic.author};
      if(res.is_collect) {this.isCollect = res.is_collect;};
      if(res.author_other_topics) {this.authorOtherTopics = res.author_other_topics;};
      if(this.topic.replies && this.topic.replies.length>0) {
        this.replies = this.topic.replies;
        this.allReplayNamesArry = this.replies.map((replay:any) => {return replay.author.loginname;});

        // 初始化底下框的艾特
        this.initAt((<any>window).topic_editor);
      }
    });

  }  ngAfterViewInit(): void {

    this.initEditor()
  }


  collectTopic(topic) {

  }

  /**
   * 添加一级回复
   */
  replayFristTopic() {
    let reply = {operate: "add"};
    this.replayTopic(reply);
    this.initEditor();
  }
  /**
   * 添加二级，修改二级回复
   * @param replayId
   * @param operate
   */
  replayTopic(reply) {
    const  operate = reply.operate;
    const topicId = this.topic._id;
    const editor =  operate === "add" ? (<any>window)["topic_add_replay2_"+reply.id] : (<any>window)["topic_edit_replay2_"+reply.id];
    const content = reply.id ? editor.codemirror.getValue() :
                              (<any>window).topic_editor.codemirror.getValue();

    if(!content) {this.alertServcie.error("","你没添加具体内容哟!")};

    if(operate === "add") {
      this.addReply(topicId, content,reply.id);
    } else {
      this.editReply(content,reply.id);
    }


  }
  addReply(topicId, content,replayId) {
    this.replayServcie.addReplay(topicId, content,replayId).subscribe((res: any) => {
      if(res.success) {
      //  this.alertServcie.success("","添加评论成功");
        this.initData(this.topic._id);
        delete  (<any>window)["topic_add_replay2_"+replayId];
      };
    });
  }
  editReply(content,replyId) {
    this.replayServcie.editReply(content,replyId).subscribe((res: any) => {
      if(res.success) {
       // this.alertServcie.success("","添加评论成功");
        this.initData(this.topic._id);
        delete  (<any>window)["topic_edit_replay2_"+replyId];
      };
    })
  }
   showAddReplyEditor($eventReplayArea,$eventReplayEditor, reply) {
    reply.operate = "add";
    $eventReplayArea.hidden = !$eventReplayArea.hidden;
    let reply2$ = (<any>window)["topic_add_replay2_"+reply.id];
    if(!reply2$  &&  !$eventReplayArea.hidden) {
      reply2$ =  (<any>window)["topic_add_replay2_"+reply.id] = new  (<any>window).Editor();
      reply2$.render($eventReplayEditor);

      let cm = reply2$.codemirror;
      reply2$.codemirror.focus();
      if(cm.getValue().indexOf('@' + this.author.loginname) < 0) {
        reply2$.push('@' + this.author.loginname + ' ');
      }

      this.initAt(reply2$);

    }



  }
  showEditReply($eventReplayArea,$eventReplayEditor, reply) {
    reply.operate = "edit";
    $eventReplayArea.hidden = !$eventReplayArea.hidden;
    let reply2$ = (<any>window)["topic_edit_replay2_"+reply.id];
    if(!reply2$  &&  !$eventReplayArea.hidden) {
      reply2$ =  (<any>window)["topic_edit_replay2_"+reply.id] = new  (<any>window).Editor();
      reply2$.render($eventReplayEditor);

      reply2$.codemirror.focus();
      reply2$.push(reply.noMarkdownContent);
      this.initAt(reply2$);

    }

  }
  initAt(reply$) {
    let $input = $(reply$.codemirror.display.input);

    // at.js 配置
    let codeMirror = (<any>window).CodeMirror;
    let codeMirrorGoLineUp = codeMirror.commands.goLineUp;
    let codeMirrorGoLineDown = codeMirror.commands.goLineDown;
    let codeMirrorNewlineAndIndent = codeMirror.commands.newlineAndIndent;
    (<any>$input).atwho({
      at: '@',
      data: this.allReplayNamesArry
    })
      .on('shown.atwho', function ()  {
        codeMirror.commands.goLineUp = null;
        codeMirror.commands.newlineAndIndent = null;
        codeMirror.commands.goLineDown = null;

      })
      .on('hidden.atwho', function () {
        codeMirror.commands.goLineUp = codeMirrorGoLineUp;
        codeMirror.commands.goLineDown = codeMirrorGoLineDown;
        codeMirror.commands.newlineAndIndent = codeMirrorNewlineAndIndent;
      });
    // END at.js 配置
  }
  /**
   * 点赞,取消赞
   */
  ups(reply,upCountSpan$) {

    let currentUpCount = parseInt(upCountSpan$.innerText,10);
    this.replayServcie.ups(reply.id).subscribe((res: any) => {
      if(!res.success) {
         this.alertServcie.error("",res.message);
         return;
      }
      if (res.action === 'up') {
        upCountSpan$.innerText = currentUpCount + 1;
      } else {
        upCountSpan$.innerText = currentUpCount - 1;
      }
    });

  }

  deleteReply(replyId) {
    this.replayServcie.deleteReply(replyId).subscribe((res: any) => {
      if(!res.success) {
        //   this.alertServcie.success("",res.message)
        this.alertServcie.error("", res.message)
      }
      this.initData(this.topic._id);

    });
  }

  /**
   * 初始化编辑器
   */
  initEditor() {
    // 初始化 评论
    (<any>window).topic_editor = new  (<any>window).Editor();
    (<any>window).topic_editor.render($('.frist_editor')[0]);
    (<any>window).topic_editor.codemirror.focus();



  }
}
