enum API {
  /**
   * 登录接口
   * @params username password
   */
  LOGIN_API = '/manager/api/login',
  /**
   * 用户分析
   * @params begin end
   */
   ANALYSIS_USER_API = '/manager/api/analysis/user',
   /**
   * 订单分析
   * @params begin end
   */
  ANALYSIS_ORDER_API = '/manager/api/analysis/order',
  /**
  * 新增分类
  * @params name
  */
  CATEGORY_ADD_API = '/manager/api/category/add',
  /**
  * 所有分类
  */
  CATEGORY_ALL_API = '/manager/api/category/get',
}

export default API;