/**
 * Created by stp4rm on 2017/8/25.
 */
export  class  SideMenuOption {


   label: string;
   url: string;
   icon: string;
   children: Array<SideMenuOption>;
   parent: SideMenuOption;

  constructor() { }
}
