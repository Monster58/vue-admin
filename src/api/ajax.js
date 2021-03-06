/*
    ajax请求函数模块
    返回值：promise对象（异步返回的数据是：response.data)
*/
import axios from "axios";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

// https://www.liulongbin.top:8888  公共接口
axios.defaults.baseURL = process.env.VUE_APP_BASEAPI;
// 添加请求拦截器(提供 `token` 令牌)
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么 展示进度条 NProgress.start()
    NProgress.start();
    config.headers.Authorization = window.sessionStorage.getItem("token");
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 在response拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done();
  return config;
});
export default function ajax(url, data = {}, type = "GET") {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise;
    if (type === "GET") {
      // 准备url query参数数据
      let dataStr = ""; //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + "=" + data[key] + "&";
      });
      if (dataStr !== "") {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
        url = url + "?" + dataStr;
      }
      // 发送get请求
      promise = axios.get(url);
    } else if (type === "POST") {
      // 发送post请求
      promise = axios.post(url, data);
    } else if (type === "PUT") {
      // 发送put请求
      promise = axios.put(url, data);
    } else if (type === "DELETE") {
      promise = axios.delete(url, data);
    } else {
      console.log(new Error("没有匹配到请求方法"));
    }
    promise
      .then(function (response) {
        // 成功了调用resolve()
        resolve(response.data);
      })
      .catch(function (error) {
        //失败了调用reject()
        reject(error);
      });
  });
}
