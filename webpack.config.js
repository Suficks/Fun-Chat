const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },
  devtool,
  devServer: {
    port: 7000,
    compress: true,
    hot: true,
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new ESLintPlugin({ extensions: ['ts'], exclude: ['/node_modules/'] }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      { test: /\.ts$/i, use: 'ts-loader' },
      {
        test: /\.s[ac]ss$/i,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      features: path.resolve(__dirname, 'src/features/'),
      shared: path.resolve(__dirname, 'src/shared/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      entities: path.resolve(__dirname, 'src/entities/'),
      widgets: path.resolve(__dirname, 'src/widgets/'),
      app: path.resolve(__dirname, 'src/app/'),
      images: path.resolve(__dirname, 'src/shared/assets/images/'),
    },
  },
};
