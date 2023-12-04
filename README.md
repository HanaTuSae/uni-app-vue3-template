<h1 align="center">Welcome to uni-app-vue3-template 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
</p>

> uni-app-vue3-template，一个使用vscode开发uniapp项目的模板。

> 技术栈：javascript + vue3 + pinia + [vk-uview-ui](https://vkuviewdoc.fsq.pub/components/install.html) + [luch-request](https://www.quanzhan.co/luch-request/guide/3.x/#%E4%BB%8B%E7%BB%8D)

## 安装

```sh
git clone xxx
npm i
```

## vscode插件安装

1. `uni-app-schemas`，必安装，作用是校验 uni-app 中的 androidPrivacy.json、pages.json 和 manifest.json 格式。
2. `uni-app-snippets`，可选，代码片段提示。
3. `uni-create-view`，可选，快速创建uniapp视图与组件。
4. `uni-highlight`，可选，对条件编译高亮
5. `uview-helper`，可选，使用uview框架可安装，语法提示。

## 升级uniapp sdk方法

### 第一种方法

1. 运行 `npx @dcloudio/uvm@latest`；会自动更新依赖。

### 第二种方法

1. 打开命令行工具，执行命令 `npm view @dcloudio/uni-app`打印当前最新的版本号，找到 `latest: 版本号在这是一串数字` 复制 `上述版本号` 替换掉根目录中的package.json文件中的版本号。然后执行 `npm install`升级，安装即可。
2. 在uniapp官方的npm版本库中找到最新的版本号[@dcloudio/uni-app](https://www.npmjs.com/package/@dcloudio/uni-app)，切换至：Version后，第一个对应的VUE3那一栏3.0.0-alpha-304xxxxx这个就是版本号。

## 使用其他ui框架，需先卸载uview

1. main.js 删除vk-uview-ui

```
import uView from './uni_modules/vk-uview-ui';
Vue.use(uView);
```

2. App.vue 删除基础样式

```
<style lang="scss">
  @import "./uni_modules/vk-uview-ui/index.scss";
</style>
```

3. uni.scss 删除全局 scss 变量文件

```
@import "@/uni_modules/vk-uview-ui/theme.scss";
```

4. 删除 vk-uview-ui 整个目录

## 使用easycom自动导入组件

在 `pages.json`中添加如下代码，规则自定义

```
"easycom": {
    "custom": {
      "^u-(.*)": "@/vk-uview-ui/components/u-$1/u-$1.vue"
    }
  },
```

## 目录说明

```
|-- auto-imports.d.ts
|-- index.html
|-- jsconfig.json
|-- package.json
|-- src
|   |-- App.vue ------------------- 入口页面
|   |-- api ----------------------- api文件
|   |-- components ---------------- 公共组件
|   |-- hooks --------------------- hook文件
|   |-- main.js ------------------- 入口js
|   |-- manifest.json ------------- 项目配置
|   |-- pages --------------------- 页面
|   |-- pages.json ---------------- 页面配置
|   |-- router -------------------- 路由配置
|   |   |-- addInterceptor.js ----- 路由拦截
|   |   `-- index.js -------------- 路由拦截实例
|   |-- shime-uni.d.ts
|   |-- static -------------------- 静态资源
|   |-- store --------------------- pinia配置
|   |-- style --------------------- 全局样式
|   |   |-- common.scss
|   |   `-- mixin.scss
|   |-- uni.scss ------------------ uni scss变量
|   |-- utils --------------------- 公共方法
|   |   `-- request.js ------------ http请求封装
|   `-- vk-uview-ui --------------- uview插件
`-- vite.config.js ---------------- vite配置

```

## Author

👤 **zdd**
