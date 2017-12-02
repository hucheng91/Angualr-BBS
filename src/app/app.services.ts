/**
 * Created by hucheng on 2017/7/15.
 */
import {NgModule} from "@angular/core";

import {HttpInterceptorService} from "./commonModule/http/interceptor/http-interceptor.service";
import {HashCodeSevice} from "./commonModule/services/hash-code.service";
import {CommonUtil} from "./commonModule/utils/common-util";
import {CacheService} from "./commonModule/services/cache.service";
import {AuthService} from "./commonModule/services/auth.service";
import {TopicService} from "./services/topic.service";
import {UserService} from "./services/user.service";
import {ReplayService} from "./services/replay.service";
/**
 * 全局service,只有全局service才放在这,业务模块的不要放进来
 */
@NgModule({
  providers: [
    HttpInterceptorService,
    HashCodeSevice,
    CacheService,
    AuthService,
    TopicService,
    CommonUtil,
    UserService,
    ReplayService
  ],
})

export class AppServicesModule { }
