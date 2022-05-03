// @ts-nocheck
const fs = require("fs");
const path = require("path");
const { SyncHook } = require("tapable");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const types = require("babel-types");
const { doesNotMatch } = require("assert");


class Compiler {
  constructor(options) {
    this.options = options;
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook(),
      emit: new SyncHook()
    };

    this.entries = new Set(); // 打包过程中的入口信息
    this.modules = new Set(); // 保存打包过程中所有出现的module信息
    this.chunks = new Set(); // 保存代码信息
    this.files = new Set(); // 保存所有产出文件的名称
    this.assets = {}; // 资源的清单
    this.context = this.options.context || process.cwd();
  }

  run() {
    // 如果想在run中影响run钩子函数的执行，可以手动处理
    this.hooks.run.call();

    // 01： 确定入口信息
    let entry = {};
    if (typeof this.options.entry === "string") {
      entry.main = this.options.entry;
    } else {
      entry = this.options.entry;
    }

    // 02  缺点如果文件的绝对路径
    for (let entryName in entry) {
      //  console.log(entry[entryName])
      // 获取绝对路径, 并统一分割符
      const entryPath = path
        .join(this.context, entry[entryName])
        .replace(/\\/g, "/");
      // console.log(entryPath)
      // TODO
      //  调用自定义的方法进行 实现具体的编译过程，得到结果
      const entryModule = this.buildModule(entryName, entryPath);
    }

    console.log("调用run，开始编译");
  }

  /**
   * @params { string } moduleName 当前被打爆的模块名称
   * @params { string } modulePath 当前打包绝对路径
   *
   * **/
  buildModule(moduleName, modulePath) {
    // 01 读取模块入口中的源文件
    const originalSourceCode = fs.readFileSync(modulePath, "utf-8");
    let targetSourceCode = originalSourceCode;
    // console.log(targetSourceCode);

    // 02 获取loader
    let loaders = [];
    const rules = this.options.module.rules;
    // 从众多的 rules中找到。js结尾文件的配置
    for (let i = 0; i < rules.length; i++) {
      if (rules[i].test.test(modulePath)) {
        // console.log(rules[i].use);
        loaders = [...loaders, ...rules[i].use];
      }
    }

    // 03 调用loader
    for (let i = loaders.length - 1; i >= 0; i--) {
      targetSourceCode = require(loaders[i])(targetSourceCode);
    }
    // console.log(targetSourceCode, "-----");

    // 04 获取模块 id
    //  获取模块相对路径
    const moduleId =
      "./" + path.posix.relative(this.context.replace(/\\/g, "/"), modulePath);
    // console.log('./'+path.posix.relative(this.context.replace(/\\/g, '/'), modulePath))

    // 05 定义变量保存将来变异之后的产出
    const module = {
      id: moduleId,
      dependencies: [],
      name: moduleName
    }

    // 06 使用 ast语法树，按自己的需求来处理， 然后返回结果
    let ast = parser.parse(targetSourceCode, {sourceType: 'module'})
    // console.log(ast)

    traverse(ast, {
      CallExpression: (nodePath) => {
        const node = nodePath.node
        if(node.callee.name === 'require'){
          // 如果找到这个 条件成立，说明找到 require语句
          console.log(node.arguments[0].value)

          // 取当前要导入的模块
          const currentModuleName = node.arguments[0].value
          // 获取当前模块，并且拼接相对路径
          const dirName = path.posix.dirname(modulePath)
          // 拼接绝对路径
          let depModulePath = path.posix.join(dirName, currentModuleName)
          // 处理文件后缀
          const extensions = this.options.resolve ? this.options.resolve.extensions : ['.js', '.json', '.jsx']
          depModulePath = addExtensions(depModulePath, extensions)

          // 修改源代码当中的目标模块 ID
          const depModuleId = './'+path.posix.resolve(this.context.replace(/\\/g, '/'), depModulePath)
          node.arguments = [types.stringLiteral(depModuleId)]
          // 将以来的模块信息保存起来
          module.dependencies.push(depModulePath)
        }
      }
    })


    // 实现 addExtension 方法
    // 处理被加载模块的后缀
    function addExtensions(modulePath, extensions) {
      // 如果用户到模块式自己加了后缀则无需处理
      if(path.extname(modulePath) === '.js')return
      // 如果用户没有添加则尝试处理
      for(let i=0;i<extensions.length;i++){
        if(fs.existsSync(modulePath + extensions[i])){
          return modulePath + extensions[i]
        }
      }
      // 如果循环结束之后仍然没有找到则说明目标模块不存在，则抛出异常
      throw new Error(`${modulePath} 对应模块不存在`)
    }


    /**
     * Todo: 返回 打包的结果
     *  return module
     * **/

    // return;
  }
}

module.exports = Compiler;
