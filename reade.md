# 面试之于 webpack

1、常见的loader 有哪些
2、webpack的构建流程 （从配置文件读取开始到资源的输出）
3、手写 loader 和plugin []
4、webpack 热更新 实现原理
5、如何利用webpack 来优化 前端性能（体验）

## 调试()

## 初始化 run 文件

> 省略了入口代码的调试
结论： run.js 就是webpack 最核心流程

## 初始化流程

 1、新建 webpack.js 和 compiler.js

## 合并配置参数

 1、读取命令行参数
 2、与用户配置参数合并

## 插件

 > 插件其实就是一个具有 apply函数的类
 > 插件 在 compiler 创建之后完成挂载
 > 挂载是否意味执行？

## 添加 钩子

 > 按上处操作挂载插件看起来是直接工作了，但有些插件是在整个流程的某个时间点上触发，所以折中情况就是用到了 tapable 钩子

## 确定入口

从配置文件中取出entry的值，内部需要转换为对象进行处理

## 新增属性

> 整个打包结束之后，必然会出现很多内容，这些内容都需要保存

## 初始化编译

1、定位入口文件的绝对路径
2、统一路径分隔符
3、调用自己的方法实现编译

## 让 loader参与打包工作

> loader 就是一个函数，接收原始数据，处理之后返回给webpack继续使用
 1、读取被打源模块的源文件
 2、使用loader处理源文件(依赖文件)
 3、以降序的方式来执行 loader

## 模块编译实现

 > webpack找到 a。js这个模块之后，就会对他进行处理，处理后的内容是一个键值对
 > 键 ./src/a.js 而 值 就是 a.js 的源代码
1、获取被打爆的模块ID
2、

## 实现 ast 遍历

1、@babel/parser  // 解析器，将源代码转化为 ast语法书
2、@babel/traverse  // 实现 ast 语法书的遍历
3、@babel/generator  //  将处理后的 ast转为可执行源代码
4、babel-types // 在便利过程中如果遇到想要操作的树上的某一个节点，那么就可以使用它

## ast

<https://search.bilibili.com/all?keyword=%E6%89%8B%E5%86%99%E7%AE%80%E6%98%93%E6%89%93%E5%8C%85%E5%99%A8%E5%AE%9E%E7%8E%B0%E4%B9%8B%E6%89%8B%E5%86%99+%E5%8B%BE%E5%B4%BD&from_source=webtop_search&spm_id_from=333.1007>

## -plugin 手写

<https://www.bilibili.com/video/BV15i4y1j7gk?spm_id_from=333.337.search-card.all.click>

## ast树 网站

<https://astexplorer.net/>
