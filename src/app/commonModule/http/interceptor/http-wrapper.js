var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var http_error_vo_1 = require('./http-error-vo');
var absoluteURLPattern = /^((?:https:\/\/)|(?:http:\/\/)|(?:www))/;
/**
 * http拦截器，这是一个抽象的拦截，不负责类似状态码，遮盖等，作为一个类似纯函数使用，具体业务逻辑在自定义定义的class里，往reduse里加函数，
 * 后续有统一日志平台，可以配合日志平台使用
 * 可义通过addRequestInterceptor，addResponseInterceptor，addErrorInterceptor
 * 这个三个方法来扩展拦截，也可以继承该类，重写逻辑
 */
var HttpWrapper = (function () {
    /**
     * @param http     构造函数，加载默认的3个拦截
     */
    function HttpWrapper(http) {
        this.http = http;
        /**
         * Headers used in all requests.
         */
        this.headers = new http_1.Headers({ 'content-type': 'application/json' });
        /**
         * Base url 用在所用的ajax默认前缀路径
         */
        this.baseUrl = '';
        /**
         * Response interceptors 是一个函数数组,可以定义多个拦截，通过addResponseInterceptor方法加入拦截，然后reduse
         * @type {Array}
         */
        this.responseInterceptors = [];
        /**
         * Request interceptors 是一个函数数组,可以定义多个拦截，通过addResponseInterceptor方法加入拦截，然后reduse
         * @type {Array}
         */
        this.requestInterceptors = [];
        /**
         * Response interceptors 是一个函数数组,可以定义多个拦截，通过addErrorInterceptor方法加入拦截，然后reduse
         * @type {Array}
         */
        this.errorInterceptors = [];
        this.addResponseInterceptor(this.defaultResponseInterceptor);
        this.addRequestInterceptor(this.defaultRequestInterceptor);
        this.addErrorInterceptor(this.defaultErrorInterceptor);
    }
    /**
     * 默认的 response interceptor
     * @param resp Response
     * @returns {any}
     */
    HttpWrapper.prototype.defaultResponseInterceptor = function (resp) {
        console.log("拦截response", resp);
        if (typeof resp.json === 'function') {
            return resp.json();
        }
        /* istanbul ignore next */
        if (typeof resp.text === 'function') {
            return resp.text();
        }
        return resp;
    };
    /**
     * 默认 request interceptor
     * @param req any
     * @returns {any}
     */
    HttpWrapper.prototype.defaultRequestInterceptor = function (req) {
        console.log("拦截request", req);
        return JSON.stringify(req);
    };
    /**
     * 默认 error interceptor，可以自定义一个处理整个error
     * @param res Response
     * @returns {any}
     */
    HttpWrapper.prototype.defaultErrorInterceptor = function (resp) {
        console.log("error", resp);
        var httpError = new http_error_vo_1.HttpErrorVO();
        httpError.status = resp.status;
        httpError.data = resp.statusText;
        return httpError;
    };
    /**
     * Sets header for all requests.
     * @param key      A header key.
     * @param value    A value for the key.
     */
    HttpWrapper.prototype.setHeader = function (key, value) {
        this.headers.set(key, value);
    };
    /**
     * Gets header by key for all requests.
     * @param key      A header key.
     * @returns value
     */
    HttpWrapper.prototype.getHeaderByKey = function (key) {
        return this.headers.get(key);
    };
    /**
     * Sets base url for all requests.
     * @param url      A base url
     */
    HttpWrapper.prototype.setBaseUrl = function (url) {
        this.baseUrl = url;
    };
    /**
     * 添加所有的response拦截到responseInterceptors
     * @param interceptor A ResponseInterceptor
     */
    HttpWrapper.prototype.addResponseInterceptor = function (interceptor) {
        this.responseInterceptors = this.responseInterceptors.concat([interceptor]);
    };
    /**
     * 添加所有的errpr拦截到errorInterceptors
     * @param interceptor A ResponseInterceptor
     */
    HttpWrapper.prototype.addErrorInterceptor = function (interceptor) {
        this.errorInterceptors = this.errorInterceptors.concat([interceptor]);
    };
    /**
     * 添加所有的errpr拦截到requestInterceptors
     * @param interceptor A RequestInterceptor
     */
    HttpWrapper.prototype.addRequestInterceptor = function (interceptor) {
        this.requestInterceptors = [interceptor].concat(this.requestInterceptors);
    };
    /**
     * 移除某些hearder
     * @param key      A header key.
     */
    /*removeHeader(key: string) {
      delete this.headers.delete(key);
    }*/
    /**
     *
     * @param url      An url which is used in a http request.
     * @param options  A request options arguments.
     * @returns     response
     */
    HttpWrapper.prototype.get = function (url, options) {
        return this.http.get(this.generateUrl(url), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    };
    /**
     *
     * @param url      An url which is used in a http request.
     * @param data     Data (in JavaScript format) which is used in a http request.
     * @param options  A request options arguments.
     * @returns
     */
    HttpWrapper.prototype.post = function (url, data, options) {
        var newData = this.prepareData(data);
        return this.http.post(this.generateUrl(url), newData, this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    };
    /**
     * Performs a request with `put` http method.
     * @param url      An url which is used in a http request.
     * @param data     Data (in JavaScript format) which is used in a http request.
     * @param options  A request options arguments.
     * @returns
     */
    HttpWrapper.prototype.put = function (url, data, options) {
        var newData = this.prepareData(data);
        return this.http.put(this.generateUrl(url), newData, this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    };
    /**
     * Performs a request with `patch` http method.
     * @param url      An url which is used in a http request.
     * @param data     Data (in JavaScript format) which is used in a http request.
     * @param options  A request options arguments.
     * @returns
     */
    HttpWrapper.prototype.patch = function (url, data, options) {
        var newData = this.prepareData(data);
        return this.http.put(this.generateUrl(url), newData, this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    };
    /**
     * Performs a request with `delete` http method.
     * @param url      An url which is used in a http request.
     * @param options  A request options arguments.
     * @returns        It returns a cold Observable which emits one value (in JavaScript format) from the request.
     */
    HttpWrapper.prototype.delete = function (url, options) {
        return this.http.delete(this.generateUrl(url), this.generateOptions(options))
            .map(this.responseHandler, this)
            .catch(this.errorHandler.bind(this));
    };
    /**
     * 通过Es6数组自带的reduse方法，处理requestInterceptors数组中所有的拦截函数
     * @param data     any
     * @returns        string
     */
    HttpWrapper.prototype.prepareData = function (data) {
        return this.requestInterceptors.reduce(function (acc, interceptor) { return interceptor(acc); }, data);
    };
    /**
     * 通过Es6数组自带的，处理responseInterceptors数组中所有的拦截函数
     * @param resp     Http response
     * @returns        any
     */
    HttpWrapper.prototype.responseHandler = function (resp) {
        return this.responseInterceptors.reduce(function (acc, interceptor) { return interceptor(acc); }, resp);
    };
    /**
     * 通过Es6数组自带的，处理errorInterceptors数组中所有的拦截函数
     * @param resp     Http response
     * @returns        any
     */
    HttpWrapper.prototype.errorHandler = function (error) {
        return Observable_1.Observable.throw(this.errorInterceptors.reduce(function (acc, interceptor) { return interceptor(acc); }, error));
    };
    /**
     * 处理通用路径 url for all requests. 如果url不是以'http','https','www'开头 使用 'baseUrl+ url'.
     * @param url     Url string
     * @returns       Generated url string
     */
    HttpWrapper.prototype.generateUrl = function (url) {
        return url.match(absoluteURLPattern) ? url : this.baseUrl + url;
    };
    /**
     * 处理请求头
     * @param options   Request options arguments
     * @returns         Request options arguments
     */
    HttpWrapper.prototype.generateOptions = function (options) {
        if (options === void 0) { options = {}; }
        if (!options.headers) {
            options.headers = new http_1.Headers();
        }
        // TODO 自定义heard一直出问题
        /*Object.keys(this.headers)
         .filter((key) => this.headers.hasOwnProperty(key))
         .forEach((key) => {
         options.headers.set(key, this.headers[key]);
         });*/
        return options;
    };
    HttpWrapper = __decorate([
        core_1.Injectable()
    ], HttpWrapper);
    return HttpWrapper;
})();
exports.HttpWrapper = HttpWrapper;
//# sourceMappingURL=http-wrapper.js.map