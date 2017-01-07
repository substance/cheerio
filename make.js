let b = require('substance-bundler')
let path = require('path')

// b.js('./src/xdom.js', {
//   target: {
//     dest: 'dist/xdom.js',
//     format: 'umd', moduleName: 'xdom'
//   },
//   commonjs: true,
//   json: true
// })

b.js('./example.js', {
  target: {
    dest: 'dist/example.js',
    format: 'cjs'
  },
  // enable buble if you want to uglify
  // buble: true,
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
})