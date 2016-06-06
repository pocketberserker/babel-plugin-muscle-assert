var compare, assert;
assert = require("assert");

compare = function (x) {
  assert.deepStrictEqual(x, { name: "foo" });
};
