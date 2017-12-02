import { Component, OnInit } from '@angular/core';
import {TopicService} from "../../../services/topic.service";
import {Router} from "@angular/router";
import {RoutingUrl} from "../../../constants/routing-url-constant";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-topic-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  noReply
  topics: any[];
  tabs: any[];
  activeTab: string = "all";
  currentPage: number = 1;
  totalItems: number = 0;     // 总数量
  itemsPerPage: number = 1;  // 每页显示的行数

  constructor(private topicService: TopicService,private router: Router) { }


  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getAllTopic(this.activeTab,event.page).subscribe();
  }
  ngOnInit() {

  }

  getAllTopic(tab: string,page?:number): Observable<any> {
    return this.topicService.getTopics(tab, !page ? 1 : page).map((res: any) => {
      this.topics = res.topics;
      this.currentPage = res.current_page;
      this.totalItems = res.pages;
      return {noReplay:res.no_reply_topics,topTopic: res.tops};
    });
  }
  detail(id: string) {
    console.log(id);
    this.router.navigate([RoutingUrl.TOPIC_DETAIL,id])
  }
}
