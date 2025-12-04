module.exports = function ({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path) {
        path.node.id.name = "prefix_" + path.node.id.name;
      }
    }
  };
};