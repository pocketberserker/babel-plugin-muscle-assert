"use strict";
const template = require("babel-template");

function isRequireAssert(callee, arg, name) {
  if (!callee.isIdentifier() || !callee.equals("name", "require")) {
    return false;
  }
  return arg.isLiteral() && arg.equals("value", name);
}

function isRequireBaseAssert(callee, arg) {
  return isRequireAssert(callee, arg, "assert");
}

function isRequirePowerAssert(callee, arg) {
  return isRequireAssert(callee, arg, "power-assert");
}

module.exports = function ({types: t}) {

  const buildRequire = template(`const IMPORT_NAME = require(SOURCE);`);
  const ast = buildRequire({
    IMPORT_NAME: t.identifier("muscle"),
    SOURCE: t.stringLiteral("muscle-assert")
  });

  function addAssertImport(file) {
    file.path.unshiftContainer("body", [ast]);
  }

  return {
    visitor: {
      AssignmentExpression: {
        enter: function (nodePath, state) {
          if (!nodePath.equals("operator", "=")) {
            return;
          }
          var left = nodePath.get("left");
          if (!left.isIdentifier()) {
            return;
          }
          if (!left.equals("name", "assert")) {
            return;
          }
          var right = nodePath.get("right");
          if (!right.isCallExpression()) {
            return;
          }
          var callee = right.get("callee");
          var arg = right.get("arguments")[0];
          if (isRequireBaseAssert(callee, arg) || isRequirePowerAssert(callee, arg)) {
            addAssertImport(state.file);
            state.set("__AUTO_IMPORT_MUSCLE_ASSERT", true)
          }
        }
      },
      VariableDeclarator: {
        enter: function (nodePath, state) {
          var id = nodePath.get("id");
          if (!id.isIdentifier()) {
            return;
          }
          if (!id.equals("name", "assert")) {
            return;
          }
          var init = nodePath.get("init");
          if (!init.isCallExpression()) {
            return;
          }
          var callee = init.get("callee");
          var arg = init.get("arguments")[0];
          if (isRequireBaseAssert(callee, arg) || isRequirePowerAssert(callee, arg)) {
            addAssertImport(state.file);
            state.set("__AUTO_IMPORT_MUSCLE_ASSERT", true)
          }
        }
      },
      ImportDeclaration: {
        enter: function (nodePath, state) {
          var source = nodePath.get("source");
          if (source.equals("value", "power-assert")) {
            addAssertImport(state.file);
            state.set("__AUTO_IMPORT_MUSCLE_ASSERT", true)
            return;
          }
          if (!(source.equals("value", "assert"))) {
            return;
          }
          var firstSpecifier = nodePath.get("specifiers")[0];
          if (!(firstSpecifier.isImportDefaultSpecifier() || firstSpecifier.isImportNamespaceSpecifier())) {
            return;
          }
          var local = firstSpecifier.get("local");
          if (!(local.equals("name", "assert"))) {
            return;
          }
          addAssertImport(state.file);
          state.set("__AUTO_IMPORT_MUSCLE_ASSERT", true)
        }
      },
      CallExpression: {
        enter: function (nodePath, state) {
          const isAutoImported = state.get("__AUTO_IMPORT_MUSCLE_ASSERT");
          if (!isAutoImported) {
            return;
          }
          var callee = nodePath.get("callee");
          if (!callee.isMemberExpression()) {
            return;
          }
          var object = callee.get("object");
          if (!object.isIdentifier()) {
            return;
          }
          if (!object.equals("name", "assert")) {
            return;
          }
          var property = callee.get("property");
          if (!property.isIdentifier()) {
            return;
          }
          if (!property.equals("name", "deepStrictEqual")) {
            return;
          }
          object.set("name", "muscle");
        }
      }
    }
  };
};
