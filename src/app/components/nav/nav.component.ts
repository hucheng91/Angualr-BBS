import {AfterViewInit, Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit,AfterViewInit {


  isShow: boolean;


  constructor(private  userService: UserService) { }


  ngOnInit(): void {
    this.userService.listenUser().subscribe((res) => {
      this.isShow = res.isLogin;
    });

  }
  ngAfterViewInit(): void {

  }

}
