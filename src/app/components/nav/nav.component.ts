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


  constructor(
    private  userService: UserService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.userService.listenUser().subscribe((res) => {
      this.isShow = res.isLogin;
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
