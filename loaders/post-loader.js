// content 如果存在 多个loader 连用，那么content 就是上个loader 处理过后返回的文件。如果单一个loader那么 content 就是匹配到的源文件
function loader(content){
  console.log('post-loader 执行了')

  return content + '// post-loader'
}
loader.pitch = () => {
  console.log('post-loader-pitch')
}
module.exports = loader