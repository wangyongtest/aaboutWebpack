//
const { interpolateName } = require('loader-utils') 

const loader = function (content) {
  const options = this.query || {};
  //  生成打包后输出德尔文件名
  console.log(this.resource, '<----')

  // 依据配置项 给的 filename 和 content 【数据内容】 生成一个 文件名称
  let filename = interpolateName(this, options.filename, { content })
  console.log(filename, '<===')

  //   将文件拷贝到指定目录
  this.emitFile(filename, content)

  //  最终返回一个buffer或者字符串 直接给 compiler使用
  return `module.exports=JSON.stringify(filename)`
};
//  loader上有一个属性，raw, 默认false, 默认按字符串处理， 目前这里是个二进制， 所以开启使用二进制处理
loader.raw = true

module.exports = loader
