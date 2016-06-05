var assert;
assert = require("power-assert");

var compare = function (x) {
  assert.deepStrictEqual(x, {name: "foo"});
};
