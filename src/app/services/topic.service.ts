import { Injectable } from '@angular/core';
import {HttpInterceptorService} from "../commonModule/http/interceptor/http-interceptor.service";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {UrlConstants} from "../constants/url-constant";

@Injectable()
export class TopicService {


  // topic

  private TOPIC_SELECTALL: string = "topic/getAllTopics";
  private TOPIC_SELECTBYID: string = "topic/" ;

  // 无人回复的主题 observe对象
  private noReplyTopicsSu = new Subject<any>();
  public noReplyTopicsObserve = this.noReplyTopicsSu.asObservable();


  // 积分榜
  private topsSu = new Subject<any>();
  public topsObserve = this.topsSu.asObservable();
  constructor(private  httpInterceptorService: HttpInterceptorService) { }

  /**
   *
   * @param tab  tab类别
   * @param page 第几页
   * @returns {Observable<R>}
   */
  getTopics(tab: string, page: number): Observable<any> {
    const url =  this.TOPIC_SELECTALL+"?tab="+tab+"&&page="+page;
    return this.httpInterceptorService.get(url);
  }
  getTopic(id: string):Observable<any> {
    const url =  this.TOPIC_SELECTBYID+id;
    return this.httpInterceptorService.get(url);

  }
  /**
   * 返回积分榜
   * @returns {Observable<any>}
   */
  getTops() {
    return this.topsObserve;
  }
  getNoReplyTopics() {
    return this.noReplyTopicsObserve
  }
  saveTopic(topic: any): Observable<any> {
   return  this.httpInterceptorService.post("topic/create",topic);
  }
  addReplayTopic(topicId: string,replyId: string, content: string) {
     return this.httpInterceptorService.post(topicId+"reply",{reply_id: replyId,r_content: content});
  }
}
