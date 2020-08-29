// vue.config.js
const path = require("path");
const resolve = function(dir) {
  return path.join(__dirname, dir);
};
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@v", resolve("src/views"))
      .set("@c", resolve("src/components"))
      .set("@u", resolve("src/utils"));
    // .set("@s", resolve("src/service")); /* 别名配置 */
    config.optimization.runtimeChunk("single");
  },
  devServer: {
    // host: "localhost",
    /* 本地ip地址 */
    // host: "192.168.1.107",
    hot: true,
    /* 自动打开浏览器 */
    open: true,
    overlay: {
      warning: false,
      error: true
    },
    port: "3000" //前台代理端口
  }
};
