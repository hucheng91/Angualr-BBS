import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class MessageIndexComponent implements OnInit {


  user: any;
  headerLabel: string =  "个人信息";
  pageTitle: "新消息";


  hasReadMessages: any; //
  notReadMessages: any;

  constructor(
    private  userService: UserService
  ) { }

  ngOnInit() {

    this.user = this.userService.user ;
    this.userService.getMessages().subscribe((res: any) => {
      this.hasReadMessages = res.has_read_messages;
      this.notReadMessages = res.hasnot_read_messages;
    } );
  }


}
