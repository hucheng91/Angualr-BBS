import {User} from "./user-model";
import {Serializable} from "../commonModule/utils/Serializable";
/**
 * @des
 * @author hucheng <cheng1_hu@saic-gm.com>
 * @Date  14/11/2017
 */
export class Topic  {


  // fillFromJSON(json: any) {
  //   throw new Error("Method not implemented.");
  // }
  //
  // getTypes(): String[] {
  //   throw new Error("Method not implemented.");
  // }


  author: User;
  author_id: string;
  collect_count: number;
  content: string;
  create_at: string;
  deleted: boolean;
  good: boolean;
  last_reply_at: string;
  lock: boolean;
  replies: any[];
  reply_count: number;
  reply_up_threshold: number;
  tab: string;
  title: string;
  top: boolean;
  update_at: string;
  visit_count: number;
  __v: number;
  _id: string;
  constructor() {
  }

}
