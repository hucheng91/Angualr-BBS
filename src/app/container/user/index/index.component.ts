import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {CommonConstants} from "../../../constants/common-constant";

@Component({
  selector: 'app-user-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class UserIndexComponent implements OnInit {


  user: any;
  headerLabel: string =  "个人信息";
  pageTitle: string;

  // user information
  siteDes:string =  CommonConstants.SITE_DES;

  recentTopics: any; //

  recentReplies: any;

  collectionTopics: any;


  constructor(
    private  userService: UserService
  ) { }

  ngOnInit() {

      this.user = this.userService.user ;
    this.userService.userCentorInformation().subscribe((res: any) => {
      this.user = res.user ;
      this.recentTopics = res.recent_topics;
      this.collectionTopics = res.collect_topics;
      this.recentReplies = res.recent_replies;
      this.pageTitle = res.pageTitle;

    } );
  }
  showCollecTopic() {
    this.userService.getCollectTopic(this.user.name).subscribe((res: any) => {
      this.collectionTopics = res.topics;
    });
  }

}
