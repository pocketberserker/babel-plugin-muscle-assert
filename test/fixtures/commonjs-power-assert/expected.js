const muscle = require("muscle-assert");

var assert = require("power-assert");

var compare = function (x) {
  muscle.deepStrictEqual(x, { name: "foo" });
};
