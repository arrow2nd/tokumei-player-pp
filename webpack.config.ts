import Autoprefixer from 'autoprefixer'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import TailwindCss from 'tailwindcss'
import { Configuration, DefinePlugin } from 'webpack'

const isDevelop = process.env.NODE_ENV === 'development'

// 共通設定
const base: Configuration = {
  mode: isDevelop ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
    filename: '[name].js',
    assetModuleFilename: 'assets/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelop
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [TailwindCss, Autoprefixer]
              }
            }
          }
        ]
      },
      {
        test: /\.png$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', 'json']
  },
  devtool: isDevelop ? 'inline-source-map' : false,
  performance: {
    maxEntrypointSize: 300000,
    maxAssetSize: 15000000
  }
}

// main.ts
const main: Configuration = {
  ...base,
  target: 'electron-main',
  entry: {
    main: path.resolve(__dirname, 'src', 'main.ts')
  }
}

// preload.ts
const preload: Configuration = {
  ...base,
  target: 'electron-preload',
  entry: {
    preload: path.resolve(__dirname, 'src', 'preload.ts')
  }
}

// renderer.ts
const renderer = {
  ...base,
  target: 'web',
  entry: {
    renderer: path.resolve(__dirname, 'src', 'renderer.tsx')
  },
  plugins: [
    new DefinePlugin({
      'process.env.PLATFORM': JSON.stringify(process.platform)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body',
      scriptLoading: 'blocking',
      minify: !isDevelop
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' })
  ]
}

export default [main, preload, renderer]
