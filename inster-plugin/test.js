import { transformFileSync } from '@babel/core'
import insertPlugin from './index.js'
import path from 'node:path'

const { code } = transformFileSync(path.join(path.resolve(), './code.js'), {
    plugins: [insertPlugin],
    parserOpts: {
        sourceType: 'unambiguous',
        plugins: ['jsx']       
    }
});

console.log(code);
