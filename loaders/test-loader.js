const { validate } = require("schema-utils");
const schemaTestLoader = require("../test-schema-loader.json");

// content 如果存在 多个loader 连用，那么content 就是上个loader 处理过后返回的文件。如果单一个loader那么 content 就是匹配到的源文件
function loader(content) {
  // 默认情况下 loader 的执行都是同步的，但是也可以改为异步

  //  设置 为异步
  const callback = this.async();
  // 获取参数
  const options = this.query || {};
  console.log(options, "--------");
  // 参数校验
  // @ts-ignore
  validate(schemaTestLoader, options);

  setTimeout(() => {
    console.log("test-loader", content, options);
    callback(null, content);
  }, 2000);
}

// loader.pitch = () =>{
//   console.log('test-loader-pitch')
// }

module.exports = loader;
