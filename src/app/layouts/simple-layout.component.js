var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SimpleLayoutComponent = (function () {
    function SimpleLayoutComponent() {
    }
    SimpleLayoutComponent.prototype.ngOnInit = function () { };
    SimpleLayoutComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            template: '<router-outlet></router-outlet>'
        })
    ], SimpleLayoutComponent);
    return SimpleLayoutComponent;
})();
exports.SimpleLayoutComponent = SimpleLayoutComponent;
//# sourceMappingURL=simple-layout.component.js.map