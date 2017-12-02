import { Component, OnInit } from '@angular/core';
import {CommonConstants} from "../../../constants/common-constant";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;

  siteDes:string =  CommonConstants.SITE_DES;
  userName: string;
  pass: string;
  user: any = {name:"",pass:""};
  constructor(private  userService: UserService,private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.user.name,this.user.pass).subscribe(res => {
      if(res) {
        this.router.navigate(["/"]);
      }
    });
  }

}
