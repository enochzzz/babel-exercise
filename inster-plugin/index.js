import generateG from '@babel/generator'
const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);
const generate = generateG.default

export default function ({ types, template }) {
  return {
    visitor: {
      CallExpression(path, state) {
        if (path.node.isNew) {
          return;
        }

        const calleeName = generate(path.node.callee).code;

        if (targetCalleeName.includes(calleeName)) {
          const { line, column } = path.node.loc.start;

          // 这里filename始终为undefined, 是因为我们使用的是transform方法，并没有文件信息。改用transfromFile就可以了。但是改完后，源码就不能已字符串的形式导出，不然ast不对，也需要修改源码文件
          const newNode = template.expression(`console.log("${state.filename || 'unkown filename'}: (${line}, ${column})")`)();
          newNode.isNew = true;

          if (path.findParent(path => path.isJSXElement())) {
            path.replaceWith(types.arrayExpression([newNode, path.node]))
            path.skip();
          } else {
            path.insertBefore(newNode);
          }
        }
      }
    }
  }
}
