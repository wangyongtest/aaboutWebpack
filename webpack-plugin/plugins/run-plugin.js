class RunPlugin {
  apply(compiler){
    compiler.hooks.run.tap('RunPlugin', () => {
      console.log('RunPlugin 钩子事件监听方法被执行')
    })
  }
}

module.exports = RunPlugin