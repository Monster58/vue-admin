import Vue from "vue";
import VueRouter from "vue-router";
//用户列表组件
import Users from "@c/Users/Users.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@c/login.vue")
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        component: () => import("@v/Welcome.vue")
      },
      {
        path: "/users",
        component: Users
      },
      {
        path: "/rights",
        component: () => import("@c/Rights/Rights.vue")
      },
      {
        path: "/roles",
        component: () => import("@c/Roles/Roles.vue")
      },
      {
        path: "/categories",
        component: () => import("@c/categories/categories.vue")
      },
      {
        path: "/params",
        component: () => import("@c/cateParams/cateParams.vue")
      },
      {
        path: "/goods",
        component: () => import("@c/goods/goods.vue")
      },
      {
        path: "/goods/addGoods",
        component: () => import("@c/goods/addGoods.vue")
      },
      {
        path: "/orders",
        component: () => import("@c/orders/orders.vue")
      },
      {
        path: "/reports",
        component: () => import("@c/reports/reports.vue")
      }
    ],
    component: () => import("@v/Home.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path == "/login" || to.path == "/") {
    return next();
  }
  if (window.sessionStorage.getItem("token")) {
    next();
  } else {
    next("/login");
  }
});

export default router;
