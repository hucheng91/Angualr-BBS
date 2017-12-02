import {Component, OnInit} from "@angular/core";
import {HttpInterceptorService} from "../../commonModule/http/interceptor/http-interceptor.service";
import {CommonUrl} from "../../services/common/common-url";
import {ResourceActionMap} from "../../constants/resource-action-map";
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  sideMenus:any;
  url: string = CommonUrl.LEFT_MENU_URL;
  constructor(private httpInterceptorService: HttpInterceptorService) {

  }

  ngOnInit() {
    let url: string = this.url;
   /* let code: any = this.cacheService.code;
    if(code) {
      url = url + "?code=" + code;
    }*/

   this.sideMenus =  [{label: "客户申请展示", url: "/customers/query", icon: "fa fa-plus-square fa-3x"},
      {label: "车辆展示", url: "/vehicles/query", icon: "fa fa-plus-square fa-3x"},
      {label: "综合展示", url: "/comprehensiveness/query", icon: "fa fa-plus-square fa-3x"},
      {label: "补充购买信息", url: "/supplements/query", icon: "fa fa-pencil-square-o fa-3x"}
    ];
   /*  let resource = {resourceId: ResourceActionMap.oauthResourceMap.leftMenu.resourceId,isNotShowDialog:false};
    this.httpInterceptorService.get(url,resource).subscribe(
      (res: any)=> {
        this.sideMenus = res.data.menu;
    });*/

  }

}
