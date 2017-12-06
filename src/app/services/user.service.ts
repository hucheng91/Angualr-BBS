import { Injectable } from '@angular/core';
import {HttpInterceptorService} from "../commonModule/http/interceptor/http-interceptor.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {

  // 当前登录用户
  user: any;
  // 右侧显示的用户信息
  userInfomation: any;
  // 用户信息 observe对象
  private userSu = new Subject<any>();
  public userObserve = this.userSu.asObservable();

  private userInfomationSu = new Subject<any>();
  public userInfomationObserve = this.userInfomationSu.asObservable();


  constructor(private  httpInterceptorService: HttpInterceptorService) {


  }

  listenUser() {
    return  this.userObserve;
  }
  getCurentUser() {

     if(this.user) {return this.user};

     let  cacheUser = sessionStorage.getItem("current_user");
     if(cacheUser) { return JSON.parse(cacheUser)}

    return null ;
  }
  isCUrrentUserLogin(): boolean {
    return (this.user || sessionStorage.getItem("current_user")) ? true : false;
  }
  getUserInfomation() {
    return this.userInfomationObserve;
  }
  // 触发 订阅当前用户信息的流
  triggerUserSu(message: any) {
    this.user = message.user;
    this.userSu.next(message);
  }
  // 触发 订阅个人信息的流
  triggerUserInfomationSu(message: any) {
    this.userInfomationSu.next(message);
  }


  login(userName: string,password: string): Observable<boolean> {
    return  this.httpInterceptorService.post("signin",{name: userName, pass: password}).map((res: any) => {
      this.user = res.data;
      sessionStorage.setItem("current_user",JSON.stringify(this.user));
       // todo 直接订阅一直不生效,放在setTimeout 中才生效,原因待查
      setTimeout(() => {
        this.triggerUserSu({user: res.data, isLogin: true});
        this.triggerUserInfomationSu(this.user);
      },500);

       return true;
     });
  }
  register(userName: string, password: string, re_pass: string,email:string ):  Observable<any> {
    return  this.httpInterceptorService.post("signup",{loginname: userName, pass: password,re_pass: re_pass, email: email});
  }
  checkLogin(url: string): Observable<boolean> {
    return this.httpInterceptorService.get("user/checkLogin").map((res: any) => {
      this.user = res.user;
      sessionStorage.setItem("current_user",this.user);
      if (res.isLogin) {
        setTimeout(() => {
          this.triggerUserSu(res);
          this.triggerUserInfomationSu(res.user)
        },500)
      }
      return true;
    },(eror) => { return Observable.throw(eror)});


  }
  signout(): Observable<any> {
    return this.httpInterceptorService.post("signout",{}).map( (res:any) => {
      this.user = null;
      sessionStorage.removeItem("current_user");
      this.triggerUserSu({});
      this.triggerUserInfomationSu({})
    })
  }
  userCentorInformation(): Observable<any> {
    return this.httpInterceptorService.get("user/"+ this.user.name);
  }
  getUserTopics(userName: string): Observable<any> {

    return this.httpInterceptorService.get(/user/+userName+'/topics');
  }
  getCollectTopic(userName: string): Observable<any> {
    return this.httpInterceptorService.get('/user/'+userName+'/collections');
  }

  getMessages(): Observable<any> {
    return this.httpInterceptorService.get('/my/messages');

  }
}
