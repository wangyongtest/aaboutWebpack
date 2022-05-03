function loader(source){
  // console.log('loader2执行了')
  return source + ' // loader2'
}

module.exports = loader