/**
 * Created by stp4rm on 2017/9/1.
 */
export  class  HashCodeSevice {
  /**
   * 针对string , number,boolean,生成hashcode
   * @param key
   * @returns {number}
   */
  private  gerenateHashCode(key: any): any {
    let string = key.toString();
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i++) {
      hash = (( ( hash << 5) - hash) + string.charCodeAt(i)) & 0xFFFFFFFF;
    }

    return hash;
  }

 public getHashCode(par: any): string {
    return this.gerenateHashCode(par);
 }
}
