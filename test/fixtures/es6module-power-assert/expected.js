const muscle = require("muscle-assert");

import assert from "power-assert";

const compare = function (x) {
  muscle.deepStrictEqual(x, { name: "foo" });
};
