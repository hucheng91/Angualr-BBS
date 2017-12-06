import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-message-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: any;
  @Input()
 set items (items: any) {

    this.messages = items;
  };

  constructor(private router: Router) { }





  ngOnInit() {

  }


}
