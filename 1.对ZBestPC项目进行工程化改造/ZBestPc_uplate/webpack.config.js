const path = require('path')
const htmlWebpcakPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new htmlWebpcakPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
}