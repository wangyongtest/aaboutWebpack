class DonePlugin {
  apply(compiler){
    compiler.hooks.done.tap('DonePlugin', () => {
      console.log('donePlugin 钩子监听')
    })
  }
}

module.exports = DonePlugin