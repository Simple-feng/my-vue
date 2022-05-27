const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // mode 选项用于告知 webpack 应当使用何种模式的内置优化
  mode: process.env.NODE_ENV !== 'development' ? 'production' : 'development',
  // entry 选项指示 webpack 应当使用那个模块来构建内部依赖图的开始。
  entry: path.resolve(__dirname, './src/main.ts'),
  // output 选项用来告诉 webpack 在哪里输出它创建的 bundle，以及如何命名这些文件
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  // resolve 选项告诉 webpack 如何解析模块
  resolve: {
    modules: ['node_modules'],
    // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
    extensions: ['.vue', '.ts', '.tsx', '.js', '.sass', '.scss', '.css'],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    alias: {}
  },
  // devServer 选项通过 webpack-dev-server 的这些配置，能够以多种方式改变其行为。
  devServer: {
    allowedHosts: 'all',
    host: 'localhost',
    port: 8089,
    open: true,
    compress: true,
    static: {
      directory: path.join(__dirname, 'dist')
    },
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
        exclude: /node-modules/
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello Webpack',
      favicon: './public/favicon.svg',
      template: './public/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}