/**
 * Created by stp4rm on 2017/9/7.
 * 中端权限控制，前端字典
 */
export class ResourceActionMap {
  static oauthResourceMap = {
    oauth:{resourceId: "oauth_getMenu",action:"oauth",path:"/getMenuInfo",method:"get"},
    logout:{resourceId: "clear_session",action:"logout",path:"/oauth/logout",method:"get"},
    switchPosition:{resourceId: "switch_position",action:"switchPosition",path:"/oauth/clear/session",method:"get"},
    leftMenu:{resourceId: "mid_getLeftMenu",action:"getLeftMenu",path:"getResourceInfo",method:"get"},
    selectPosition: {resourceId: "select_position",action:"select_position",path:"getResourceInfo",method:"get"}
  }
  static customerResourceMap =  {
    select: {resourceId: "customer_select",action:"select",path:"/rest/customers/",method:"post"},
    selectById: {resourceId: "customer_selectById",action:"select",path:"/rest/customers/",method:"get"},
    selectStatus: {resourceId: "customer_select_status",action:"select",path:"/rest/customers/status/",method:"get"},
    add:  {resourceId: "customer_add",action:"add",path:"/rest/customers",method:"post"},
    edit: {resourceId: "customer_edit",action:"edit",path:"/rest/customers/",method:"put"},
    del:  {resourceId: "customer_delete",action:"delete",path:"/rest/customers/",method:"delete"},
    selectLoad: {resourceId: "customer_load",action:"select",path:"/rest/customers/load",method:"post"},
  }
  static vehiclesResourceMap =  {
    select: {resourceId: "vehicles_select",action:"select",path:"/rest/vehicles/",method:"post"},
    selectById: {resourceId: "vehicles_selectById",action:"select",path:"/rest/vehicles/",method:"get"},
    selectByStatus: {resourceId: "vehicles_selectByStatus",action:"select",path:"/rest/vehicles/status/",method:"get"},
    selectByVin: {resourceId: "vehicles_selectByVin",action:"select",path:"/rest/vehicles/vin/",method:"get"},
    add:  {resourceId: "vehicles_add",action:"add",path:"/rest/vehicles",method:"post"},
    edit: {resourceId: "vehicles_edit",path:"",action:"edit"},
    del:  {resourceId: "vehicles_delete",action:"delete"},
    selectLoad: {resourceId: "vehicles_load",action:"select",path:"/rest/vehicles/load/",method:"post"},
  }
  static comprehensivesResourceMap =  {
    select: {resourceId: "comprehensives_select",action:"select",path:"/rest/comprehensives/",method:"post"},
    selectById: {resourceId: "comprehensives_selectById",action:"select",path:"/rest/comprehensives/",method:"get"},
    importChartger:{resourceId: "comprehensives_importChartger",action:"select",path:"/rest/comprehensives/import",method:"post"},
    add:  {resourceId: "comprehensives_add",action:"add",path:"/rest/comprehensives/",method:"post"},
    edit: {resourceId: "comprehensives_edit",action:"edit",path:"/rest/comprehensives/",method:"put"},
    del:  {resourceId: "comprehensives_delete",action:"delete",path:"/rest/comprehensives/",method:"delete"}
  }
  static supplementsResourceMap =  {
    select: {resourceId: "supplements_select",action:"select",path:"/rest/supplements/",method:"post"},
    selectById: {resourceId: "supplements_selectById",action:"select",path:"/rest/supplements/",method:"get"},
    add:  {resourceId: "supplements_add",action:"add",path:"/rest/supplements",method:"post"},
    edit: {resourceId: "supplements_edit",action:"edit",path:"/rest/supplements/",method:"put"},
    del:  {resourceId: "supplements_delete",action:"delete",path:"/rest/supplements/",method:"delete"}
  }
  static tokenResourceMap =  {
    fileToken: {resourceId: "file_token",action:"select",path:"/rest/token",method:"get"}
  }
}
