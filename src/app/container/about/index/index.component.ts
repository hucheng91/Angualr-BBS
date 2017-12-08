import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class AboutIndexComponent implements OnInit {


  user: any;
  headerLabel: string =  "个人信息";
  pageTitle: string;

  constructor(    private  userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.user ;

  }

}
