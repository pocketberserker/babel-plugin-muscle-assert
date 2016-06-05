const muscle = require("muscle-assert");

var compare, assert;
assert = require("assert");

compare = function (x) {
  muscle.deepStrictEqual(x, { name: "foo" });
};
