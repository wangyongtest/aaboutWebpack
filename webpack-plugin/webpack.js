const Compiler = require("./compiler");

function webpack(config) {
  /**
   * 在实例化 compiler之前，我们需要将用户的配置参数 和 shell命令参数合并
   *
   * **/
  // @ts-ignore
  const shellOptions = process.argv.slice(2).reduce((config, arg) => {
    // console.log(config)
    // console.log(arg)
    // console.log(arg.split('='))
    let [key, value] = arg.split("=");
    config[key.slice(2)] = value;
    return config;
  }, {});

  // console.log(shellOptions, 'shellOptions')

  const finalOptions = { ...config, ...shellOptions };

  // 实力话 compiler类，接收配置参数返回compiler实力对象
  const compiler = new Compiler(finalOptions);
  // 创建完之后挂载 插件
  finalOptions.plugins.forEach((plugin) => {
    plugin.apply(compiler);
  });

  return compiler;
}

module.exports = webpack;
