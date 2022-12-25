import parser from '@babel/parser'
import traverseG from '@babel/traverse'
import generateG from '@babel/generator'
import templateG from '@babel/template'
import types from '@babel/types'
import { sourceCode } from './code.js'

const traverse = traverseG.default
const generate = generateG.default
const template = templateG.default

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
  plugins: ['jsx']
})

const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);


traverse(ast, {
  CallExpression(path, state) {
    if (path.node.isNew) {
      return;
    }

    let condition = false;

    let calleeCode = generate(path.node.callee).code // 打印的代码类似 'console.log'
    condition = targetCalleeName.includes(calleeCode)
    if (condition) {
      const { line, column } = path.node.loc.start;

      const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();
      newNode.isNew = true;

      if (path.findParent(path => path.isJSXElement())) {
        path.replaceWith(types.arrayExpression([newNode, path.node]))
        path.skip();
      } else {
        path.insertBefore(newNode);
      }
    }
  }
})

const { code, map } = generate(ast)
console.log(code)
