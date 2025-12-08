import { declare } from "@babel/helper-plugin-utils";
import * as t from "@babel/types";

export default declare((api, options) => {
  api.assertVersion(7);

  return {
    name: "remove-console-log",
    visitor: {
      CallExpression(path) {
        const { node } = path;

        // console.log(...) を検出
        if (
          t.isMemberExpression(node.callee) &&
          t.isIdentifier(node.callee.object, { name: "console" }) &&
          t.isIdentifier(node.callee.property, { name: "log" })
        ) {
          path.remove(); // その呼び出しを削除
        }
      },
    },
  };
});