import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot
} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../commonModule/services/auth.service";
import {UserService} from "../user.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService,private userService: UserService) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let url: string = state.url;
    // return this.checkLogin(url);
     return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

  canLoad(route: Route): Observable<boolean> {

    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> {

  return this.userService.checkLogin(url);
  }

}
