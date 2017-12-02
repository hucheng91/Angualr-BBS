import { Injectable } from '@angular/core';


@Injectable()
export class CacheService {
  public  code: string;
  private  menus:any;  // 左侧菜单
  private headHtml: string; // 头信息
  private positionCode: string; //
  private userCode: string;   //
  private userName: string;
  private  resources: any;
  private  dealerCode: any;
          dealerList: any;
          positionList: any;

  constructor() { }
  setMenus(menus):void {
    this.menus = menus;
  }
  getMenus(): any {
    return this.menus;
  }
  setHeadHtml(html):void {
    this.headHtml = html;
  }
  getHeadHtml() {
    return this.headHtml;
  }
  setPositionCode(positionCode):void {
    this.positionCode = positionCode;
  }
  getPositionCode() {
    return this.positionCode;
  }
  setUserCode(userCode):void {
    this.userCode = userCode;
  }

  getUserCode() {
    return this.userCode;
  }
  setUserName(userName):void {
    this.userName = userName;
  }
  getUserName() {
    return this.userName ;
  }
  setResources(resources):void {
    this.resources = resources;
  }
  getResources() {
    return this.resources;
  }
  setDealerCode(dealerCode: string) {
    this.dealerCode = dealerCode;
  }
  getDealerCode() {
    return this.dealerCode;
  }


}
