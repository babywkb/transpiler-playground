const fs = require('fs');

module.exports = function ({ types: t }) {
  return {
    visitor: {
      Program(path) {
        const astJson = JSON.stringify(path.node, null, 2);
        fs.writeFileSync('./output/ast-output.json', astJson);
        console.log('✅ AST dumped to ast-output.json');
      }
    }
  };
};