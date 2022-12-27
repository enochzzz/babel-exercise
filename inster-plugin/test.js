import { transform } from '@babel/core'
import insertPlugin from './index.js'
import path from 'node:path'
import { sourceCode } from './code.js';
const { code } = transform(sourceCode, {
    plugins: [insertPlugin],
    parserOpts: {
        sourceType: 'unambiguous',
        plugins: ['jsx']       
    }
});

console.log(code);
