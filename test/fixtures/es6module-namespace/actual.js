import * as assert from "assert";

const compare = function (x) {
  assert.deepStrictEqual(x, { name: "foo" });
};
