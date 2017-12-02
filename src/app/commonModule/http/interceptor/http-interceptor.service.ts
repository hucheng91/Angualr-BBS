import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {HttpWrapper} from "./http-wrapper";
import {HttpCodeConstant} from "../../../constants/http-code-constant";
import {HashCodeSevice} from "../../services/hash-code.service";
import {Router} from "@angular/router";
import {UrlConstants} from "../../../constants/url-constant";
import {AlertService} from "../../services/alert.service";
@Injectable()
export class HttpInterceptorService extends HttpWrapper {
  constructor(protected http: Http,protected hashCodeSevice: HashCodeSevice,
              protected alertService: AlertService,
              protected router: Router) {
    super(http,hashCodeSevice,alertService);
    super.addErrorInterceptor(this.errorInterceptor);
    super.addResponseInterceptor(this.responseInterceptor);
    super.setBaseUrl(UrlConstants.BASE_URL);
    (<any>window).alertService = this.alertService;
  }
  private responseInterceptor(resp: Response): any {
    (<any>window).alertService.operateRepeatMessage(resp);
    if ((resp.status === HttpCodeConstant.put_code || resp.status === HttpCodeConstant.delete_code)) {
      return resp;
    }
    // 兼容下有些content-type C写成大写的朋友
    const contentType = !resp.headers.get('content-type')?resp.headers.get('Content-type'):resp.headers.get('content-type') //
     if (contentType === 'application/json; charset=utf-8' || contentType === 'application/json') {
      return resp.json();
    } else if (contentType === 'application/text') {
      return resp.text();
    }else {
      return resp;
    }
  }

  /**
   * 默认 request interceptor
   * @param req any
   * @returns {any}
   */
  protected requestInterceptor(req: any): string {
    return req;
  }

  /**
   * 默认 error interceptor，可以自定义一个处理整个error
   * @param res Response
   * @returns {any}
   */
  protected errorInterceptor(resp: Response): Response {
    let result;

    switch (resp.status) {
      case HttpCodeConstant.error: {
        (<any>window).alertService.error("系统提示","系统异常,请联系管理员");
        break;
      }
      case HttpCodeConstant.error_code: {
        (<any>window).alertService.error("系统提示",resp.json().error);
        break;
      }
      case HttpCodeConstant.bad_gateway: {
        (<any>window).alertService.error("系统提示","系统异常,请联系管理员");
        console.log("网关异常");
        break;
      }
      case HttpCodeConstant.badRequest: {
        (<any>window).alertService.error("系统提示","系统异常,请联系管理员");
        break;
      }
      case HttpCodeConstant.not_allow: {
        (<any>window).alertService.error("系统提示","权限不足,请联系管理员");
        break;
      }
      case HttpCodeConstant. time_out: {
        (<any>window).alertService.error("系统提示","连接超时,请联系管理员");
        break;
      }
      case HttpCodeConstant.notFound: {
        (<any>window).alertService.error("系统提示","系统异常,请联系管理员");
        break;
      }
      case HttpCodeConstant.oauthRedirectCode: {
        location.href = result.redirectTo;
        sessionStorage.setItem("race_redirecTo_url",result.redirectTo);
        break;
      }
      case HttpCodeConstant.select_dealer_code: {
        (<any>window).alertService.showDealerCodeSelectPage(resp.json().data);
        break;
      }
      default: {
        break;
      }
    }

    return resp;
  }

}
