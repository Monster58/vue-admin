# vue-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目优化
1. 生成打包报告

   ```shell
   vue-cli-service build --report
   ```

2. 为开发模式与发布模式指定不同的打包入口

   默认情况下，Vue项目的`开发模式`与` 发布模式`，公用一个打包入口文件`src/main.js`。为了将项目的开发与发布过程分离，可以分为两种模式，指定各自打包的入口文件，即：

   ① 开发模式入口文件`src/main-dev.js`

   ② 开发模式入口文件`src/main-prod.js`

3. 通过`externals`加载外部CDN资源

4. 首页内容定制

5. 路由懒加载

   >  当打包构建项目时，`JavaScript`包会变得非常大，影响页面加载。

   ​	① 安装`@babel/plugin-syntax-dynamic-import`包

   ​	② 在`babel.config.js`配置文件中声明该插件。

   ​	③ 将路由改为按需加载的形式，示例代码如下：

   ```js
   const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
   const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
   ```

6. 开启服务器`gzip`压缩
