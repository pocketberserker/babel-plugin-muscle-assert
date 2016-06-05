const muscle = require("muscle-assert");

import * as assert from "assert";

const compare = function (x) {
  muscle.deepStrictEqual(x, { name: "foo" });
};
