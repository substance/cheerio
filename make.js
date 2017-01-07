let b = require('substance-bundler')
let path = require('path')

b.rm('dist')
b.rm('tmp')

b.js('./src/xdom.js', options({
  targets: [{
    dest: 'dist/xdom.es.js',
    format: 'es'
  }, {
    dest: 'dist/xdom.cjs.js',
    format: 'cjs'
  }]
}))

b.js('./example.js', options({
  target: {
    dest: 'tmp/example.js',
    format: 'cjs'
  }
}))

function options(opts) {
  return Object.assign({
    commonjs: true,
    json: true,
    resolve: {
      alias: {
        'dom-serializer': path.join(__dirname, 'src/renderXNode.js'),
        // TODO: these make the bundle pretty heavy. Are they really needed?
        'entities': path.join(__dirname, 'src/empty.js'),
        'entities/maps/entities.json': path.join(__dirname, 'src/empty.js'),
        'entities/maps/legacy.json': path.join(__dirname, 'src/empty.js')
      }
    }
  }, opts)
}
