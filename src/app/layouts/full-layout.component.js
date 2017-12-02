var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var user_model_1 = require('../models/user-model');
var FullLayoutComponent = (function () {
    function FullLayoutComponent(userInfoService, router) {
        this.userInfoService = userInfoService;
        this.router = router;
        this.disabled = false;
        this.status = { isopen: false };
        this.user = new user_model_1.User();
        this.user = userInfoService.getUserInfo();
    }
    FullLayoutComponent.prototype.toggled = function (open) {
        console.log('Dropdown is now: ', open);
    };
    FullLayoutComponent.prototype.logout = function () {
        console.log("logout");
        this.userInfoService.logout();
        this.router.navigate(["/login"]);
    };
    FullLayoutComponent.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    };
    FullLayoutComponent.prototype.ngOnInit = function () { };
    FullLayoutComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            styleUrls: ['full-layout.component.css'],
            templateUrl: './full-layout.component.html'
        })
    ], FullLayoutComponent);
    return FullLayoutComponent;
})();
exports.FullLayoutComponent = FullLayoutComponent;
//# sourceMappingURL=full-layout.component.js.map