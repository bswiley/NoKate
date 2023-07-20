const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new WebpackPwaManifest({
        name: 'NoKate',
        short_name: 'Jate',
        description: 'Not Kate text editor',
        background_color: '#ffffff',
        theme_color: '#463f57',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // Adjust the sizes as needed
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src/sw.js', // Adjust the path to your service worker file
        swDest: 'sw.js'
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]',
          },
          // Add a custom option to specify the size of the image
          // 96 x 96 pixels in this case
          options: {
            parser: {
              dataUrlCondition: {
                maxSize: 96 * 96,
              },
            },
          },
        },
      ],
    },
  };
};