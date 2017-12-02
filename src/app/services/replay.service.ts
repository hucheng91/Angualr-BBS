import { Injectable } from '@angular/core';
import {HttpInterceptorService} from "../commonModule/http/interceptor/http-interceptor.service";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ReplayService {



  constructor(private  httpInterceptorService: HttpInterceptorService) { }

  /**
   * 添加一级回复
   * @param topicId
   * @param content
   * @returns {Observable<T>}
   */
  addReplay(topicId: string,content: string,replayId?:string): Observable<any> {

   return this.httpInterceptorService.post(topicId+"/reply",{r_content:content,reply_id: replayId ? replayId : '' });
  }

  /**
   * 点赞
   */
  ups(replyId: string): Observable<any>  {
    return this.httpInterceptorService.post('/reply/' + replyId + '/up',{})
  }

  deleteReply(replyId): Observable<any>  {
    return  this.httpInterceptorService.post('/reply/' + replyId + '/delete',{reply_id: replyId})
  }

  /**
   * 修改评论
   * @param replyId
   * @returns {Observable<T>}
   */
  editReply(content: string,replyId:string): Observable<any>  {
    return  this.httpInterceptorService.post('/reply/' + replyId + '/edit',{t_content: content})
  }
}
