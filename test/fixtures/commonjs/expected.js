const muscle = require("muscle-assert");

var assert = require("assert");

var compare = function (x) {
  muscle.deepStrictEqual(x, { name: "foo" });
};
