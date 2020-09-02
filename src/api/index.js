/**
 * 包含n个接口请求函数的模块
 * 函数的返回值： promise对象
 */
import ajax from "./ajax.js";
// const BASE_URL = 'https://www.liulongbin.top:8888/api/private/v1/'
//登录
export const login = data => ajax(`login`, data, "POST");
//获取左侧菜单
export const getMenuList = () => ajax("menus");
//获取用户列表
export const getUserList = data => ajax("users", data);
//修改用户状态
export const changeUserState = (url, data) => ajax(url, data, "PUT");
//添加用户
export const addUser = data => ajax("users", data, "POST");
//根据id获取用户
// export const editUserById = data => ajax("users", data);
//获取权限列表
export const getRights = () => ajax("rights/list");
//获取权限列表
export const getRightsTree = () => ajax("rights/tree");
//获取角色列表
export const getRoles = () => ajax("roles");
//添加角色
export const addRoles = data => ajax("roles", data, "POST");
//根据ID查询角色
// export const getRolesById = data => ajax("roles", data);
//删除角色
export const deleteRoles = (url, data) => ajax(url, data, "DELETE");
// 删除角色指定权限
export const deleteRolesRightsAjax = (url, data) => ajax(url, data, "DELETE");
// 角色授权
export const setRolesRightsAjax = (url, data) => ajax(url, data, "POST");
//获取商品分类
export const getCategories = data => ajax("categories", data);
//添加分类
export const addCategoriesAjax = data => ajax("categories", data, "POST");
//根据 id 查询分类
export const getCategoriesByIdAjax = url => ajax(url);
// 编辑提交分类
export const editCategoriesAjax = (url, data) => ajax(url, data, "PUT");
// 删除分类
export const deleteCategoriesAjax = (url, data) => ajax(url, data, "DELETE");
//获取分类参数
export const getCategoriesParamsAjax = (url, data) => ajax(url, data);
// 添加动态参数或者静态属性
export const addCategoriesParamsAjax = (url, data) => ajax(url, data, "POST");
//根据 ID 查询参数
export const getCategoriesParamsByIdAjax = url => ajax(url);
// 编辑提交参数
export const putCategoriesParamsAjax = (url, data) => ajax(url, data, "PUT");
//  删除参数
export const deleteCategoriesParamsAjax = url => ajax(url, {}, "DELETE");
//获取商品列表数据
export const getGoodsListAjax = data => ajax("goods", data);
// 删除商品
export const deleteGoodsAjax = (url, data) => ajax(url, data, "DELETE");
// 添加商品
export const addGoodsAjax = data => ajax("goods", data, "POST");
//订单数据列表
export const getOrdersAjax = data => ajax("orders", data);
//查看物流信息
export const getLogisticsAjax = url => ajax(url);
