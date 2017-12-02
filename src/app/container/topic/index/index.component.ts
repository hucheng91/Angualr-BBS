import {Component, OnInit, ViewChild} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {CommonConstants} from "../../../constants/common-constant";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-topic-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // 高量tab ,默认全部
  activeItemIndex: number = 1;
  // topic
  noReplayTopic: any;
  topsTopic:any;

  // user information
  siteDes:string =  CommonConstants.SITE_DES;
  userInfo: any;
  headerLabel: string =  "个人信息";

  @ViewChild(ListComponent)listComponent: ListComponent;

  constructor(
    private  userService: UserService
  ) { }

  ngOnInit() {
    this.listComponent.getAllTopic("all").subscribe((res:any) => {
      this.noReplayTopic = res.noReplay;
      this.topsTopic = res.topTopic;
    });

    this.userService.getUserInfomation().subscribe((res) => {
      this.userInfo = res ;
    });
  }
  swichTab(tab, activeNumber) {
    this.activeItemIndex = activeNumber;
    this.listComponent.getAllTopic(tab);
    this.listComponent.activeTab = tab;
  }
}
