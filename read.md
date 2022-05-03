# 手写loader

## 前置

[!视频链接]<https://www.bilibili.com/video/BV1QM4y1N7TR?spm_id_from=333.337.search-card.all.click>

webpack打包流程
 1、在这整个工作流当中的一个环节（loader 来实现不同类型的文件都按模块来处理）
 2、 手写loader (配置 使用 语法 常见的loader手写)
 3、 plugin
     1、tapable
     2、实现插件执行实际 自定义插件
  4、自己实现一个打包流程 + 自己写loader + 自己写插件 ===》 mini webpack

5、 性能优化： 吧 webpack 当作一个工具来使用是我们要做的优化

## loader使用

1、 loader本质就是一个导出内容为函数的js模块
2、 loader 默认就可以接收上游传递过过来的资源文件 或结果 [上一个loader处理完的结果]
3、 compiler 会拿到最后一个 loader的产出结果，这个结果应该是 string 或者 buffer
4、 loader 从入口文件出发，找到所有以来的模块，直到所有依赖模块都被loader 处理之后返回结果

filer-loader 工作原理 ===> 返回一个字符串形式的图片名称【路径】，资源copy 一份到指定目录

## loader 分类

> 对于 loader 默认都是一样的，只不过在使用的时候可以放在不同的位置 或者进行不同的修饰， 因此说起来 loader 就有了分类
 1、 普通 loader   没有做任何配置
 2、前置 loader    enforce 属性配置 pre
 3、后置 loader    enforce 配置属性 post
 4、行内 loader    使用 ！ 进行分割
 5、 pre > normal > inline > post

## loaderRunner

## 配置符号

> 为了使用方便，可以通过一些符号的来设置某些的开启和关闭

- !跳过了normal-loader
- -!  跳过了 normal + pre loader
- !! 不读取配置文件， 跳过了normal + pre + post（只保留了inline-loader）

## loader组成

> 一个完整的 loader 是由 normalLoader pitchLoader 两部分组成

## 为什么 loader 返回值一定要被 js执行

- webpack 是干嘛用的 (打包)
- loader是干嘛用的  （转换，将一些不是JS模块的东西变成可以像js模块一样的处理的东西）

## loader获取 参数

 > 在使用loader 的时候用户可以给定一些参数，在loader的视线过程中可以拿到，从而服务于loader的业务逻辑
 1、说这个环节的目的是为了演示 loader-utils 插件
 2、webpack 5 版本： 如果loader配置了options 直接可以通过 this.query获取  options 中配置， 不再需要 loader-utils插件
 3、 拿到参数后有什么用？
     1、 以babel-loader为例： presets:['@babel/presets-env', '@babel/preset-react']
     2、所以 babel-loader 内部会拿到 options 里的参数来决定此次 将在 JS 作何种处理

## loader参数校验

## file-loader

  > 返回新的文件名，让webpack 将当前文件 copy 指定路径

  css-loader: 将 css 转换为js
  对 (@import  @media  url()) 转换

npm i @babel/core @babel/preset-env babel-loader css-loader file-loader html-webpack-plugin less  loader-utils mime schema-utils to-string-loader url-loader webpack webpack-cli -D

<https://www.bilibili.com/video/BV1Lg41177aH?spm_id_from=333.337.search-card.all.click>
