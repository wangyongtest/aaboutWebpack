// @ts-nocheck

(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id];
    const module = {
      exports: {}
    };

    function loaclRequire(filePath) {
      const id = mapping[filePath];
      return require(id);
    }

    fn(loaclRequire, module, module.exports);

    return module.exports;
  }

  require(1);
})({
  1: 
  [
    function (require, module, exportss) {
      "use strict";

      var _foo = require("./foo.js");

      (0, _foo.foo)();
      console.log("main.js");
    },
    {"./foo.js": 2 }
  ],
  2: [
    function (require, module, exportss) {
      "use strict";
     
      function foo() {
        console.log("foo");
      }
      module.exports = {foo};
    },
    { }
  ],
});
