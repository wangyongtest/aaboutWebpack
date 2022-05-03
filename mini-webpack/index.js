// @ts-nocheck
import fs from "fs";
import path from "path";
import ejs from "ejs";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import { transformFromAst } from "@babel/core";

import { config } from "./config.js";
import { SyncBailHook } from "tapable";

const hooks = {
  emitFile: new SyncBailHook(["context"])
};

let id = 0;

function createAssets(filePath) {
  // 1、获取文件内容

  let source = fs.readFileSync(filePath, {
    encoding: "utf-8"
  });

  // console.log(source)

  // 2、 获取依赖关系
  //  - 正则方式
  //  - ast方式

  // initLoader
  const loaders = config.module.rules;

  const loaderContext = {
    addDeps(dep) {
      // console.log('addDep', dep)
    }
  };

  loaders.forEach(({ test, use }) => {
    if (test.test(filePath)) {
      if (Array.isArray(use)) {
        use.forEach((fn) => {
          // source = fn.call(source)

          // 相当于loader 链式调用
          source = fn.call(loaderContext, source);
        });
      } else {
        source = use(source);
      }
    }
  });

  // 这里不配置sourceType报错，无法识别 import  es6 语法
  const ast = parser.parse(source, {
    sourceType: "module"
  });
  // console.log(ast);

  const deps = [];

  // @ts-ignore
  traverse.default(ast, {
    ImportDeclaration({ node }) {
      deps.push(node.source.value);
    }
  });

  // @ts-ignore
  const { code } = transformFromAst(ast, null, {
    presets: ["env"]
  });

  // console.log(code)

  return {
    filePath,
    code,
    deps,
    mapping: {},
    id: id++
  };
}

// createAssets('./example/main.js')
// console.log(assets)

function createGraph() {
  const mainAssets = createAssets("./example/main.js");

  const queue = [mainAssets];
  for (let asset of queue) {
    asset.deps.forEach((relativePath) => {
      const child = createAssets(path.resolve("./example", relativePath));
      // console.log(child);
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }
  return queue;
}

function initPlugin() {
  const plugins = config.plugins;
  plugins.forEach((plugin) => {
    plugin.apply(hooks);
  });
}
initPlugin();

const graph = createGraph();

function bundle(graph) {
  const template = fs.readFileSync("./example/bundle.ejs", {
    encoding: "utf-8"
  });

  const data = graph.map((asset) => {
    const { id, code, mapping } = asset;
    return {
      id,
      code,
      mapping
    };
  });
  // console.log(data)
  const code = ejs.render(template, { data });

  let outPutPath = "./dist/bundle.js";
  const context = {
    changeOutputPath(path) {
      outPutPath = path;
    }
  };
  // 执行插件来修改outputPath 进行返回
  hooks.emitFile.call(context);
  console.log(outPutPath, "outPutPath");

  fs.writeFileSync(outPutPath, code);
  // console.log(code);
}

bundle(graph);
