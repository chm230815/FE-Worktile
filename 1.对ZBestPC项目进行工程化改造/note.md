1. 原生项目ZBestPC项目地址
   1. https://github.com/NewCoder798/ZBestPC
2. 优化点分析
   1. 引用过于分散 html css js 分别在不同的位置 不好维护
   2. js全部同步加载
   3. js没有进行压缩
   4. 引入的一些包都是min版本 不好调试
   5. js全部隐藏到单独的js文件当中 外部的html完全没有体现
   6. 最好不要用原生js操作dom html中就引入个js 然后项目就运行了 再打开这个js文件很整洁 里面引入了上百js文件 然后你就猜吧 哪个文件 哪行代码控制了哪个按钮 很难维护
3. 方案
   1. 将所有文件进行合并 折后再分割
      1. 分割的力度是重点也是难点
      2. 代码压缩 js的压缩和css的压缩是不一样的

4. 项目开发需求文档
   1. 项目webpack改造
      1. 项目初始化
         1. 创建npm项目
         2. 安装webpack依赖
         3. 创建js入口文件
         4. 创建webpack配置文件
         5. 配置package.json的build命令
         6. 执行npm run build打包
```js
   // 1. npm init
   // 2. npm install webpack webpack-cli
   // 3. src 下创建index.js
   // 4. webpack配置
   const path = require('path')
      module.exports = {
      mode: 'development',
      entry: './src/index.js',
      output: {
         filename: 'bundle.js',
         path: path.resolve(__dirname, './dist')
      }
   }
   // 5.package.json
   "scripts": {
    "build": "webpack"
   },
```
      2. 首页移植
         1. 资源文件拷贝
```js
   // 1. 将index.html 复制到src中
   // 2. 安装html-webpack-plugin
   // 3. webpack.config.js中配置
      plugins: [
      new htmlWebpcakPlugin({
         filename: 'index.html',
         template: './src/index.html'
      })
   ]
   // 4. 会将html也进行打包 并加上defer有序加载
```
         2. 删除index.html中的link和script
         3. 配置html-webpack-plugin
         4. 再src/index.js中添加css引用
         5. 再src/index.js添加js引用
         6. 调整index.html的图片路径
      3. 登录页移植
         1. 拷贝login至src/login.html
         2. 删除css引用
         3. 修改图片链接img/为../src/img/
         4. 在src/index.js中添加import './css/login.css'
         5. 修改webpack配置 添加login.html配置
      4. 进阶操作
         1. 多js分离
         2. 开发模式
         3. css独立打包
         4. js css压缩
         5. 公共模板抽离
         6. 清空打包结果
   1. vue SPA应用改造
      1. 创建build目录
         1. 将webpack配置移到build目录
         2. 将相对路径改为绝对路径
         3. 修改scripts命令
      2. 接入vue
         1. 安装依赖
         2. 添加vue源码
         3. 创建模板文件
         4. 在webpack中添加vue打包配置
      3. 首页移植
         1. 创建home.vue 移植html和js代码
         2. 重新打包
      4. vueRouter接入
         1. 安装vue-router依赖
         2. 添加router.js配置
         3. 修改main.js 添加vue-router相关内容
      5. 登录页移植
         1. 创建login.vue 移植html和js代码
         2. 修改app.vue
         3. 将public.css移到全局
         4. 修改Home.vue跳转Login.vue的方法
   2. vue MPA应用改造
      1. 创建mpa目录,新建home.js 和login.js
      2. 修改home.vue路由跳转源码
      3. 创建webpack.vue.mpa.config.js添加MPA配置