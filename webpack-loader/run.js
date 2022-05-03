// 1  引入原生的 webpack
const Webpack = require('./webpack')

// 2  配置文件导入

const config = require('./webpack.config.js')
// 3 创建 compiler 对象实例
// @ts-ignore
const compiler = Webpack(config)

// 4 调用 run 方法开始编译

// @ts-ignore
compiler.run()