///<reference path="../../../../../node_modules/rxjs/add/operator/do.d.ts"/>
import {Headers, Http, RequestOptionsArgs, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/do";
import {CommonConstants} from "../../../constants/common-constant";
import {HashCodeSevice} from "../../services/hash-code.service";
import {HttpWrapperParam} from "./http-wrapper-param";
import {AlertService} from "../../services/alert.service";

type ResponseInterceptor = (response: any) => any;
type RequestInterceptor = (request: any) => any;
type ErrorInterceptor = (error: any) => any;

const absoluteURLPattern = /^((?:https:\/\/)|(?:http:\/\/)|(?:www))/;

/**
 * http拦截器，这是一个抽象的拦截，不负责类似状态码，遮盖等，作为一个类似纯函数使用，具体业务逻辑在自定义定义的class里，往reduse里加函数，
 * 后续有统一日志平台，可以配合日志平台使用
 * 可义通过addRequestInterceptor，addResponseInterceptor，addErrorInterceptor
 * 这个三个方法来扩展拦截，也可以继承该类，重写逻辑
 */
@Injectable()
export class HttpWrapper {
  /**
   * Headers used in all requests.
   */
  private headers: Headers = new Headers({'content-type': 'application/json'});

  /**
   * Base url 用在所用的ajax默认前缀路径
   */
  protected baseUrl = '';

  /**
   * Response interceptors 是一个函数数组,可以定义多个拦截，通过addResponseInterceptor方法加入拦截，然后reduse
   * @type {Array}
   */
  private responseInterceptors: Array<ResponseInterceptor> = [];

  /**
   * Request interceptors 是一个函数数组,可以定义多个拦截，通过addResponseInterceptor方法加入拦截，然后reduse
   * @type {Array}
   */
  private requestInterceptors: Array<RequestInterceptor> = [];

  /**
   * Response interceptors 是一个函数数组,可以定义多个拦截，通过addErrorInterceptor方法加入拦截，然后reduse
   * @type {Array}
   */
  private errorInterceptors: Array<ErrorInterceptor> = [];

  /**
   * @param http     构造函数，加载默认的3个拦截
   */
  constructor(protected http: Http,protected hashCodeSevice: HashCodeSevice,
              protected  alertService: AlertService
              ) {
    this.addRequestInterceptor(this.defaultRequestInterceptor);
    this.addResponseInterceptor(this.defaultResponseInterceptor);
    this.addErrorInterceptor(this.defaultErrorInterceptor);

  }
  /**
   * 默认 request interceptor
   * @param req any
   * @returns {any}
   */
  protected defaultRequestInterceptor(req: any): string {
    return req;
  }

  /**
   * 默认的 response interceptor
   * @param resp Response
   * @returns {any}
   */
  protected defaultResponseInterceptor(resp: Response): any {
    return resp;
  }



  /**
   * 默认 error interceptor，可以自定义一个处理整个error
   * @param res Response
   * @returns {any}
   */
  protected defaultErrorInterceptor(resp: Response): Response {
    return resp;
  }

  /**
   * Sets header for all requests.
   * @param key      A header key.
   * @param value    A value for the key.
   */
  setHeader(key: string, value: string) {
    this.headers.set(key, value) ;
  }

  /**
   * Gets header by key for all requests.
   * @param key      A header key.
   * @returns value
   */
  getHeaderByKey(key: string) {
    return this.headers.get(key);
  }

  /**
   * Sets base url for all requests.
   * @param url      A base url
   */
  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  /**
   * 添加所有的response拦截到responseInterceptors
   * @param interceptor A ResponseInterceptor
   */
  addResponseInterceptor<T, S>(interceptor: (arg: T) => S): void {
    this.responseInterceptors = [ ...this.responseInterceptors, interceptor ];
  }

  /**
   * 添加所有的errpr拦截到errorInterceptors
   * @param interceptor A ResponseInterceptor
   */
  addErrorInterceptor<T, S>(interceptor: (arg: T) => S): void {
    this.errorInterceptors = [ ...this.errorInterceptors, interceptor ];
  }

  /**
   * 添加所有的errpr拦截到requestInterceptors
   * @param interceptor A RequestInterceptor
   */
  addRequestInterceptor<T, S>(interceptor: (arg: T) => S): void {
    this.requestInterceptors = [ interceptor, ...this.requestInterceptors ];
  }

  /**
   * 移除某些hearder
   * @param key      A header key.
   */
  /* removeHeader(key: string) {
   delete this.headers.delete(key);
   }*/
  /**
   * 通过Es6数组自带的reduse方法，处理requestInterceptors数组中所有的拦截函数
   * @param data     any
   * @returns        string
   */
  protected prepareData(data: any): string {
    // return data;
    return this.requestInterceptors.reduce((acc, interceptor) => interceptor(acc), data);
  }

  /**
   * 通过Es6数组自带的，处理responseInterceptors数组中所有的拦截函数
   * @param resp     Http response
   * @returns        any
   */
  protected responseHandler(resp: Response): any {
    return this.responseInterceptors.reduce((acc: any, interceptor: any) => interceptor(acc), resp);
  }

  /**
   * 通过Es6数组自带的，处理errorInterceptors数组中所有的拦截函数
   * @param resp     Http response
   * @returns        any
   */
  protected errorHandler(error: Response): Observable<any> {
    return Observable.throw(
      this.errorInterceptors.reduce((acc: any, interceptor: any) => interceptor(acc), error)
    );
  }

  /**
   * 处理通用路径 url for all requests. 如果url不是以'http','https','www'开头 使用 'baseUrl+ url'.
   * @param url     Url string
   * @returns       Generated url string
   */
  protected generateUrl(url: string): string {
    return url.match(absoluteURLPattern) ? url : this.baseUrl + url;
  }

  /**
   * 处理请求头
   * @param options   Request options arguments
   * @returns         Request options arguments
   */
  protected generateOptions(options: RequestOptionsArgs = {}): RequestOptionsArgs {
    if (!options.headers) {
      options.headers = this.headers;
    }
    options.headers.set(CommonConstants.APP_CODE_RACE.id,CommonConstants.APP_CODE_RACE.code);
    options.headers.set("X-Requested-With","XMLHttpRequest");

    return options;
  }
  /**
   *
   * @param url      An url which is used in a http request.
   * @param options  A request options arguments.
   * @param isShowLoading 是否显示遮盖
   * @param resourceId 资源id,node中端通过这个做权限校验
   * @returns     response
   */
  get<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
   //  this.alertService.openLoadProcess(param.isShowDialog);
    return this.http.get(this.generateUrl(url)+ "?date="+new Date().getTime(), this.generateOptions(options))
      .map(this.responseHandler, this)
      .catch(this.errorHandler.bind(this))
      .do((res)=> {console.log("success"+res);},
        (res) => {/*console.log("error"+res);this.alertService.closeLoadProcess();*/},
        () => {/*this.alertService.closeLoadProcess(param.isShowDialog)*/} );
  }

  /**
   *
   * @param url      An url which is used in a http request.
   * @param data     Data (in JavaScript format) which is used in a http request.
   * @param options  A request options arguments.
   * @param isShowLoading 是否显示遮盖
   * @param resourceId 资源id,node中端通过这个做权限校验
   * @returns
   */
  post<T>(url: string, data: Object, options?: RequestOptionsArgs): Observable<T> {
    // this.alertService.openLoadProcess(param.isShowDialog);
    return this.http.post(this.generateUrl(url), this.prepareData(data), this.generateOptions(options))
      .map((res:any) => {return this.responseHandler(res)})
      .catch(this.errorHandler.bind(this))
      .do((res)=> {console.log("success"+res);},
        (res) => {/*console.log("error"+res);this.alertService.closeLoadProcess(param.isShowDialog);*/},
        () => {/*this.alertService.closeLoadProcess(param.isShowDialog)*/} );
  }

  /**
   * Performs a request with `put` http method.
   * @param url      An url which is used in a http request.
   * @param data     Data (in JavaScript format) which is used in a http request.
   * @param options  A request options arguments.
   * @param isShowLoading 是否显示遮盖
   * @param resourceId 资源id,node中端通过这个做权限校验
   * @returns
   */
  put<T>(url: string, data: Object, options?: RequestOptionsArgs): Observable<T> {
    // this.alertService.openLoadProcess(param.isShowDialog);
    return this.http.put(this.generateUrl(url), this.prepareData(data), this.generateOptions(options))
      .map(this.responseHandler, this)
      .catch(this.errorHandler.bind(this))
      .do((res)=> {},
        (res) => {/*console.log("error"+res);this.alertService.closeLoadProcess(param.isShowDialog);*/},
         () => {/*this.alertService.closeLoadProcess(param.isShowDialog)*/} );
  }

  /**
   * Performs a request with `patch` http method.
   * @param url      An url which is used in a http request.
   * @param data     Data (in JavaScript format) which is used in a http request.
   * @param options  A request options arguments.
   * @param isShowLoading 是否显示遮盖
   * @param resourceId 资源id,node中端通过这个做权限校验
   * @returns
   */
  patch<T>(url: string, data: Object, param:HttpWrapperParam,options?: RequestOptionsArgs): Observable<T> {
    // this.alertService.openLoadProcess(param.isShowDialog);
    return this.http.put(this.generateUrl(url), this.prepareData(data), this.generateOptions(options))
      .map(this.responseHandler, this)
      .catch(this.errorHandler.bind(this))
      .do((res)=> {console.log("success"+res);},
        (res) => {/*console.log("error"+res);this.alertService.closeLoadProcess(param.isShowDialog);*/},
        () => {/*this.alertService.closeLoadProcess(param.isShowDialog)*/} );
  }

  /**
   * Performs a request with `delete` http method.
   * @param url      An url which is used in a http request.
   * @param options  A request options arguments.
   * @param isShowLoading 是否显示遮盖
   * @param resourceId 资源id,node中端通过这个做权限校验
   * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
   */
  delete<T>(url: string,param:HttpWrapperParam, options?: RequestOptionsArgs): Observable<T> {
    // this.alertService.openLoadProcess(param.isShowDialog);
    return this.http.delete(this.generateUrl(url), this.generateOptions(options))
      .map(this.responseHandler, this)
      .catch(this.errorHandler.bind(this))
      .do((res)=> {},
        (res) => {/*console.log("error"+res);this.alertService.closeLoadProcess(param.isShowDialog);*/},
        () => {/*this.alertService.closeLoadProcess(param.isShowDialog)*/} );
  }




}
