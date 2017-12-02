/**
 * Created by stp4rm on 2017/8/21.
 */
export  interface Serializable {
  /**
   * 序列化json to class object
   * eg:
   * let json: any = {id:1, userName:"abc",nickName:"1234",password: "222222"};
   *  let user: User  = new User();
   *  user.fillFromJSON(json);
   *  console.log(user);
   * @param json
   */
  fillFromJSON(json: any);
  getTypes(): String[];
}
