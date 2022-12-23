import parser from '@babel/parser'
import traverseG from '@babel/traverse'
import generateG from '@babel/generator'
import types from '@babel/types'
import { sourceCode } from './code.js'

const traverse = traverseG.default
const generate = generateG.default

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
  plugins: ['jsx']
})

traverse(ast, {
  CallExpression(path, state) {
    console.log(path, state, 111)
    if (types.isMemberExpression(path.node.callee)
      && path.node.callee.object.name === 'console'
      && ['log', 'info', 'error', 'debug'].includes(path.node.callee.property.name)
    ) {
      const { line, column } = path.node.loc.start;
  
      path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`))
    }
  }
})

const { code, map } = generate(ast)
console.log(code)
