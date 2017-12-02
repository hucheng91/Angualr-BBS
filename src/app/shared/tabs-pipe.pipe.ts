import { Pipe, PipeTransform } from '@angular/core';
import {CommonConstants} from "../constants/common-constant";

@Pipe({
  name: 'tabsPipe'
})
export class TabsPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // let test = CommonConstants.TABS_TYPE.find((item) => {return item.id ===  value});
    // console.
    return CommonConstants.TABS_TYPE.find((item) => {return item.id ===  value}).text;
  }

}
