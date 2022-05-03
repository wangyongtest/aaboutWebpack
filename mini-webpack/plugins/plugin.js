
export class Plugin {

  apply(hooks){
    hooks.emitFile.tap('changeOutputPath', (context) => {
      console.log('-------changeOutputPath', context)
      context.changeOutputPath('./dist/main.js')
    })
  }
}

 