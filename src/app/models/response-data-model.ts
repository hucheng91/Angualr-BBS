import {Serializable} from "../commonModule/utils/Serializable";
/**
 * Created by stp4rm on 2017/7/25.
 */
export class ResponseData  implements Serializable {



  code: string;
  message: string;
  success: boolean;
  data: any;

  fillFromJSON(json: any) {
    let fields: Array<any> = this.getTypes();
    let that : any = this;
    fields.forEach((value) => {
      that[value] = json[value]? json[value] : "";
    });
  }
  getTypes(): String[] {
    return ["code", "message", "success", "data"] ;
  }

}
