export default declare((api, options) => {
  return {
    visitor: {
      FunctionDeclaration(path) {
        path.node.id.name = "prefix_" + path.node.id.name;
      }
    }
  };
});