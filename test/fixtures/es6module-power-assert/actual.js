import assert from "power-assert";

const compare = function (x) {
  assert.deepStrictEqual(x, {name: "foo"});
};
