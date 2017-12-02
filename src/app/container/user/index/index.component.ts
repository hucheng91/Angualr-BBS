import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonConstants} from "../../../constants/common-constant";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class UserIndexComponent implements OnInit {


  // user information
  siteDes:string =  CommonConstants.SITE_DES;
  user: any;
  headerLabel: string =  "个人信息";


  recentTopics: any; //

  recentReplies: any;


  constructor(
    private  userService: UserService
  ) { }

  ngOnInit() {

      this.user = this.userService.user ;

    this.userService.userCentorInformation().subscribe((res) => {

    } );
  }

}
