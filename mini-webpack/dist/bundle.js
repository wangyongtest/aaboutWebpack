// @ts-nocheck

(function(modules){
  function require(id) {
    const [fn, mapping] = modules[id]
    const module = {
      exports:{}
    }
    function localRequire(filePath){
      const id = mapping[filePath]
      return require(id)
    }
  
    fn(localRequire,module, module.exports)
  
    return module.exports
  }
  
  require(0)
})({
  
  
    "0": [function(require, module, exports) { 
      "use strict";

var _foo = require("./foo.js");

var _user = require("./user.json");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_user2.default);
(0, _foo.foo)();
console.log('main.js');
     }, {"./foo.js":1,"./user.json":2}],
    
    "1": [function(require, module, exports) { 
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

function foo() {
  console.log('foo');
}
     }, {}],
    
    "2": [function(require, module, exports) { 
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "{\r\n  \"name\":\"wy\",\r\n  \"hander\":\"test\"\r\n}";
     }, {}],
    


  
})
