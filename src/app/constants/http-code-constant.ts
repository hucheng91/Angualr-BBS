/**
 * Created by hucheng on 2017/7/16.
 */
export const  enum HttpCodeConstant {

  // http code
  success = 200,
  error = 500,
  error_code = 403,
  time_out = 504,
  bad_gateway = 502,
  notFound = 404,
  badRequest = 400,
  not_allow = 401,
  oauthRedirectCode = 511,  // oauth认证中间层返回重定向到认证中心的状态码
  select_dealer_code = 591, // 选岗 返回code
  put_code = 201,
  delete_code = 204
}

