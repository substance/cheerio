import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

export default {
  plugins: [
    nodeResolve({
      extensions: [ '.js', '.json' ],
      preferBuiltins: true
    }),
    commonjs(),
    json()
  ],
  entry: 'src/cheerio-ext.js',
  external: [
    'assert', 'buffer', 'child_process', 'constants', 'events',
    'fs', 'os', 'path', 'stream', 'tty', 'url', 'util'
  ],
  targets: [
    { dest: 'dist/cheerio.cjs.js', format: 'cjs' },
    { dest: 'dist/cheerio.es.js', format: 'es' }
  ],
  sourceMap: true
}