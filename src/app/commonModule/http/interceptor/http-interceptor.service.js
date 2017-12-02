var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_wrapper_1 = require('./http-wrapper');
var url_constant_1 = require('../../../constants/url-constant');
var HttpInterceptorService = (function (_super) {
    __extends(HttpInterceptorService, _super);
    function HttpInterceptorService(http) {
        _super.call(this, http);
        this.http = http;
        console.log("HttpInterceptorService come in");
        _super.prototype.addRequestInterceptor.call(this, this.requestInterceptor);
        _super.prototype.addErrorInterceptor.call(this, this.errorInterceptor);
        _super.prototype.setBaseUrl.call(this, url_constant_1.UrlConstants.BASE_URL);
        // super.setHeader('content-type', CommonConstants.CONTENT_TYPE);
    }
    HttpInterceptorService.prototype.responseInterceptor = function (resp) {
        console.log("每个系统自己拦截response", resp);
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
    HttpInterceptorService.prototype.requestInterceptor = function (req) {
        // 每个系统根据自己的组件定义遮盖
        console.log("每个系统自己拦截request", req);
        return JSON.stringify(req);
    };
    /**
     * 默认 error interceptor，可以自定义一个处理整个error
     * @param res Response
     * @returns {any}
     */
    HttpInterceptorService.prototype.errorInterceptor = function (errorVO) {
        console.log("每个系统自己拦截error", errorVO);
        switch (errorVO.status) {
            case 500 /* error */: {
                // TODO
                console.log("dowhat", errorVO);
                break;
            }
            case 400 /* badRequest */: {
                // TODO
                console.log("dowhat", errorVO);
                break;
            }
            case 404 /* notFound */: {
                // TODO
                console.log(errorVO);
                break;
            }
            default: {
                // TODO
                break;
            }
        }
    };
    HttpInterceptorService = __decorate([
        core_1.Injectable()
    ], HttpInterceptorService);
    return HttpInterceptorService;
})(http_wrapper_1.HttpWrapper);
exports.HttpInterceptorService = HttpInterceptorService;
//# sourceMappingURL=http-interceptor.service.js.map
