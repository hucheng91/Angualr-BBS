import { Component, OnInit } from '@angular/core';
import {CommonConstants} from "../../../constants/common-constant";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../commonModule/services/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  siteDes: string = CommonConstants.SITE_DES;
  user:any = {loginname:'' ,pass:"" ,re_pass:"", email:"" } ;
  constructor(private  userService: UserService,private router: Router,private alertServcie: AlertService) { }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.user.loginname,this.user.pass,this.user.re_pass ,this.user.email).subscribe(res => {
      if(res.success) {
        this.alertServcie.success("",res.message);
        this.router.navigate(["/"]);
      }
    });
  }
}
