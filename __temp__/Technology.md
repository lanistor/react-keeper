# 技术讲解

## 基础架构
`webpack + express` : webpack用来构建JS文件，express用于启动静态服务器.
## 代码规范化
`Eslint` : 规定团队开发的代码格式，使用强制方式规范化代码.
## 测试框架
`Karma` : 完成自动单元测试.
## 目录结构
 * `docs/` 文档目录
 * `example/` 示例项目目录
   - `server.js` 示例项目启动文件
   - `webpack.config.js` 示例项目webpack配置
   - `index.js` 示例项目入口js文件
   - `index.html` 示例项目入口文件
 * `modules/` 项目代码目录
 * `node_modules/` node依赖模块
 * `__test__/` Karma测试目录
 * `__temp__/` 临时目录，该目录下文件内允许有中文，上线后删除该目录
 * `webpack.config.js` webpack主配置文件
 * `karma.conf.js` karma配置文件
 * `.babelrc` babel配置文件
 * `.eslintrc` eslint配置文件