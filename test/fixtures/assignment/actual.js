var assert;
assert = require("assert");

var compare = function (x) {
  assert.deepStrictEqual(x, { name: "foo" });
};
