# 代码目录结构

## src 源代码

### api

服务器端 api 调用的封装

### laylout

公用结构（布局）

### views

组件（路由页面文件）

### router

路由配置信息

### store

vuex

## mock （临时生成假数据）

## 用户登录页

点击登录按钮之后会派发一个 action
调用 api 文件中的登录接口发送一个 post 请求
获取数据之后提交 commit 设置 state 中的 token
在本地 cookie 中存储 token
页面跳转
