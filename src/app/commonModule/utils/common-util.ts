import {Injectable} from "@angular/core";
@Injectable()
export  class CommonUtil {

  /**
   * 获取 地址栏参数
   * eg: xxxx.com?userName='wang'&id=2;
   * let id = getUrlParam(id);
   */
  public  getUrlParam(key): any {
      return this.parseQueryString(key);
  }

  private parseQueryString(key): any {
    let str: any = window.location.search;
    let objURL = {};

    str.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
        objURL[ $1 ] = $3;
      }
    );
    return (<any>objURL).key;
  };
}
