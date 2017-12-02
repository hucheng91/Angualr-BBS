import {Serializable} from "../commonModule/utils/Serializable";
/**
 * Created by hucheng on 2017/7/16.
 */
export class User  {
  accessToken?: string | "";
  active: boolean;
  avatar: string;
  collect_tag_count: number;
  collect_topic_count: number;
  create_at: string;
  email: string;
  follower_count: number;
  following_count: number;
  is_block: boolean;
  loginname: string = "";
  name: string;
  pass: string;
  receive_at_mail: boolean;
  receive_reply_mail: boolean
  reply_count: number;
  score:number;
  topic_count: number;
  update_at: string;
  __v: number;
  _id: string;
  constructor() {
  }

}
