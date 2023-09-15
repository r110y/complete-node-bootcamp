// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module-1");
const calc1 = new C();
const sum = calc1.add(5, 10);
console.log(sum);

// exports
// const calc2 = require("./test-module-2");
// With destructuring to avoid importing unnecessary functions
const { add, subtract, multiply, divide } = require("./test-module-2");
console.log(add(20, 30));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
