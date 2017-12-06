import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-message-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class MessageListComponent implements OnInit {

  @Input()
  items: any;

  constructor(private router: Router) { }





  ngOnInit() {

  }


}
