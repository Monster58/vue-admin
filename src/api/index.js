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
export const changeUserState = data => ajax("", data, "PUT");
//添加用户
export const addUser = data => ajax("users", data, "POST");
//根据id获取用户
// export const editUserById = data => ajax("users", data);
// 提交编辑用户
export const subEditUser = data => ajax("", data, "PUT");
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
