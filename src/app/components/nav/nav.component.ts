import {AfterViewInit, Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit,AfterViewInit {


  isShow: boolean;
  notReadMessageCount: number;

  constructor(
    private  userService: UserService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.notReadMessageCount = 0;
    this.userService.listenUser().subscribe((res) => {
      this.isShow = !res.isLogin ? false : true;
      if (res.user && res.user.messages_count){
        this.notReadMessageCount = parseInt(res.user.messages_count ,10);
      }else {
        this.notReadMessageCount = 0
      }
    });

  }
  ngAfterViewInit(): void {

  }
  signout() {
    this.userService.signout().subscribe((res: any) => {
      this.router.navigate(["/"]);
    });
  }

}
