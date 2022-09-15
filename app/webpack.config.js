const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const path = require('path');

const mode = process.env.NODE_ENV;
const isProductionMode = mode === 'production';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const paths = {
  src: path.resolve(__dirname, 'src'),
  public: path.resolve(__dirname, 'public'),
  output: path.resolve(__dirname, 'dist'),
  watchFiles: path.resolve(__dirname, 'src/**/*'),
  include: path.resolve(__dirname, 'src/js'),
  entry: {
    index: path.resolve(__dirname, 'src/js/index.ts'),
    about: path.resolve(__dirname, 'src/js/about.ts'),
  },
  template: {
    index: path.resolve(__dirname, 'public/index.html'),
    about: path.resolve(__dirname, 'public/about.html'),
  },
};

module.exports = {
  mode,

  devtool: !isProductionMode && 'source-map',

  target: isProductionMode ? 'browserslist' : 'web',

  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 3000,
    watchFiles: {
      paths: ['./public/**/*'],
      options: {
        ignored: '/node_modules/',
        usePolling: true,
      },
    },
  },

  watchOptions: {
    poll: 1000,
    aggregateTimeout: 200,
    ignored: /node_modules/,
  },

  entry: paths.entry,

  output: {
    filename: 'js/[name].js',
    path: paths.output,
  },

  resolve: {
    extensions,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        extensions,
      }),
    ],
  },

  module: {
    rules: [
      // JS
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // TS
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          },
        ],
        include: [paths.include],
      },
      // STYLES MODULE
      {
        test: /\.module\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[sha1:hash:hex:7]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      // STYLES NO MODULE
      {
        test: /^((?!\.module).)*(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // IMAGES
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      // SVG
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: 'svg/[name][ext]',
        },
      },
      // FONTS
      {
        test: /\.(woff(2)?|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: paths.template.index,
      chunks: ['index'],
    }),
    new HTMLWebpackPlugin({
      filename: 'about.html',
      template: paths.template.about,
      chunks: ['about'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
};
