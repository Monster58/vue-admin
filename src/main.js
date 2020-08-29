import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//reset.css
import "./assets/reset.css";
import "./assets/global.css";
import App from "./App.vue";
import router from "./router";
// 全局组件
import breadcrumb from "@c/breadcrumb";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.component("my-breadcrumb", breadcrumb);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
