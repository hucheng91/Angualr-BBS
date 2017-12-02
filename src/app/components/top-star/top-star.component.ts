import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-top-star',
  templateUrl: './top-star.component.html',
  styleUrls: ['./top-star.component.css']
})
export class TopStarComponent implements OnInit {


  tops:any;


 @Input()
 public  set topsTopic(topics :any) {

  this.tops = topics;

 }


  constructor() { }

  ngOnInit() {

  }

}
