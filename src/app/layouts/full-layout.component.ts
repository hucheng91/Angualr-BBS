import {AfterViewInit, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../models/user-model";
import * as $ from "jquery";

@Component({
  selector: 'app-dashboard',
  styleUrls: ['full-layout.component.css'],
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit,AfterViewInit {


  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};
  public user: User = new User();
  public headHtml:string;
  constructor( public router: Router) {

  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    let windowHeight = $(window).height();
    let $backtotop = $('#backtotop');
    let top = windowHeight - $backtotop.height() - 200;


    function moveBacktotop() {
      $backtotop.css({ top: top, right: 0});
    }

    function footerFixBottom() {
      if($(document.body).height() < windowHeight){
        $("#footer").addClass('fix-bottom');
      }else {
        $("#footer").removeClass('fix-bottom');
      }
    }

    $backtotop.click(function () {
      $('html,body').animate({ scrollTop: 0 });
      return false;
    });
    $(window).scroll(function () {
      let winHeight = $(window).scrollTop();
      if (winHeight > 200) {
        $backtotop.fadeIn();
      } else {
        $backtotop.fadeOut();
      }
    });

    moveBacktotop();
    footerFixBottom();
    $(window).resize(moveBacktotop);
    $(window).resize(footerFixBottom);

    $('.topic_content a,.reply_content a').attr('target', '_blank');






  }
}
