import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {userInfo} from "os";
import {AlertService} from "../../../commonModule/services/alert.service";
import {Router} from "@angular/router";




@Component({
  selector: 'app-setting-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class SettingIndexComponent implements OnInit {


  user: any;
  headerLabel: string =  "个人信息";
  pageTitle: string;

  old_pass: any;
  new_pass: any;

  constructor(    private  userService: UserService,
                  private alertService: AlertService,
                  private router: Router
  ) { }

  ngOnInit() {
     let userInfomation  = this.userService.user;
     if(!userInfomation.url) { userInfomation.url = ""};
     if(!userInfomation.location) { userInfomation.location = ""};
     if(!userInfomation.weibo) { userInfomation.weibo = ""};
     if(!userInfomation.githubUsername) { userInfomation.githubUsername = ""};
     if(!userInfomation.signature) { userInfomation.signature = ""};
    userInfomation.old_pass ="";
    userInfomation.new_pass ="";
    this.user = userInfomation;

  }

  changeSetting(action: string) {
    this.userService.changeSettion(action,this.user).subscribe((res: any) => {
        this.alertService.success("",res.message);
        if(action === 'change_password') {
          this.userService.signout().subscribe(() => {
            location.href ="/#/sing/login";
          });

        }
    });
  }



}
