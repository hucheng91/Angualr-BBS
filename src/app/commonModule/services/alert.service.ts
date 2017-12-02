/**
 * Created by sihi46 on 2017/7/28.
 */

import {Injectable} from "@angular/core";
import {Message} from "primeng/primeng";
import {Subject} from "rxjs/Subject";
import {ConfirmDialogModal} from "../../models/confirmDialog-modal";
import {isUndefined} from "util";
import {Router} from "@angular/router";
import {CacheService} from "../services/cache.service";
@Injectable()
export class AlertService {
  // alert dialog
  private growalSu = new Subject<Message>();  //
  growalObserve = this.growalSu.asObservable();

  // 重复登录
  private repeatLoginSu = new Subject<Message>();
  repeatLoginObserve = this.repeatLoginSu.asObservable();


  // confirm dialog
  private confirmDialogSu =  new Subject<ConfirmDialogModal>();
  confirmDialogObserve = this.confirmDialogSu.asObservable();

  // loading bar
  private loadingProcessSu =  new Subject<boolean>();
  loadingProcessObserve = this.loadingProcessSu.asObservable();

  //
  constructor(private cacheService:CacheService,private  router:Router) {

  }
  private  setMessage(message: Message) {
    this.growalSu.next(message);
  }
  private  setConfirmDialogParam(confirmDialogModal: ConfirmDialogModal) {
    this.confirmDialogSu.next(confirmDialogModal);
  }
  public info(message: string, callback?: Function) {
    this.setMessage({severity:'info', summary:'提示', detail:message})
    if (callback) {
      callback();
    }
  }
  public success(title: string, message: string, callback?: Function) {
    this.setMessage({severity:'success', summary:'提示', detail:message});
    if (callback) {
      callback();
    }
  }

  public warning(confirmDialogModal: ConfirmDialogModal) {
    this.setConfirmDialogParam(confirmDialogModal);
  }
  public error(title: string, message: string) {
    this.setMessage({severity:'error', summary:"提示", detail:message})

  }

  private operateRepeatMessage(res) {
     // const  warnCode
      this.repeatLoginSu.next({severity:'error', summary:"警告", detail:"重复登录"})
  }

  public openLoadProcess(isNotSHow) {
    if(!isNotSHow) {
      this.loadingProcessSu.next(true);
    }
  }
  public closeLoadProcess(isNotSHow) {
    if(!isNotSHow) {
      this.loadingProcessSu.next(false);
    }
  }
  public showDealerCodeSelectPage(data: any[]) {

    this.cacheService.dealerList = data;
    this.router.navigate(["/dealerSelect"])

  }


  /**
   *在检验时间上提示
   * @param beginDate
   * @param endDate
   * @param callback
   */
  public  dateValid(beginDate:any,endDate:any,title?:string,callback?:Function) : boolean {
    if((!isUndefined(beginDate)&&beginDate!=null) && (!isUndefined(endDate)&&endDate!=null)) {
      if(beginDate>=endDate) {
        this.error("提示",isUndefined(title)?"" : title+"结束时间必须大于开始时间！");
        return false;
      }
    }
    if(callback) {
      callback();
    }
    return true;
  }
}
