/**
 * @des 获取腰带,登录认证
 * @author hucheng <cheng1_hu@saic-gm.com>
 * @Date  24/9/2017
 */
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpInterceptorService} from "../http/interceptor/http-interceptor.service";
import {CacheService} from "./cache.service";
import {CommonUtil} from "../utils/common-util";
import {Observable} from "rxjs/Observable";
import {CommonUrl} from "../../services/common/common-url";
import {UrlConstants} from "../../constants/url-constant";
import {UserService} from "../../services/user.service";


@Injectable()
export class AuthService {
  constructor(private router: Router,

              private httpInterceptorService: HttpInterceptorService
              ) {

  }

}
