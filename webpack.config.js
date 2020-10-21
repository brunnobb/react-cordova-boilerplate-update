const webpack = require("webpack");
const { merge } = require("webpack-merge");

// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // installed via npm
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("@babel/polyfill");

// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  entry: ["@babel/polyfill", "./css/main.less", "./js/main.jsx"],
  build: `${__dirname}/www/`,
  filename: "[name].[hash].bundle.js",
  clean: {
    dry: false,
    verbose: true,
    dangerouslyAllowCleanPatternsOutsideProject: true,
    cleanOnceBeforeBuildPatterns: ["**/*"],
    cleanAfterEveryBuildPatterns: [
      "../platforms/android/app/src/main/assets/www",
      "../platforms/ios/www",
    ],
  },
};

const commomWebpack = {
  cache: false,
  plugins: [
    /* ,
        new CopyWebpackPlugin([{
            from: './html'
        }, {
            from: './img',
            to: './img'
        }, {
            from: './static',
            to: './static'
        }])
        */
  ].filter(Boolean),
  entry: {
    bundle: PATHS.entry,
  },
  output: {
    // default output path
    path: PATHS.build,
    filename: PATHS.filename,
  },
  module: {
    rules: [
      {
        test: /(\.js$|\.jsx?$)/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      {
        exclude: /node_modules/,
      },
      {
        test: /(\.ts$|\.tsx?$)/,
        exclude: /(node_modules|public)/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/typescript",
            [
              "@babel/preset-env",
              {
                modules: false,
                targets: "defaults",
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            // 'react-hot-loader/babel',
            "@babel/plugin-proposal-class-properties",
          ],
        },
      },
      {
        test: /(\.js$|\.jsx?$)/,
        exclude: /(node_modules|public)/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                modules: false,
                targets: "defaults",
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            // 'react-hot-loader/babel',
            "@babel/plugin-proposal-class-properties",
          ],
        },
      },
      {
        test: /\.css$/,
        // exclude: /(node_modules|public)/,
        loader: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|public)/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /(node_modules|public)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.png/,
        loader: "url-loader",
        exclude: /(node_modules|public)/,
        options: {
          limit: 100000,
          minetype: "image/png",
        },
      },
      {
        test: /\.jpg/,
        exclude: /(node_modules|public)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.gif/,
        exclude: /(node_modules|public)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.webm/,
        exclude: /(node_modules|public)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.mp4/,
        exclude: /(node_modules|public)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.svg/,
        exclude: /(node_modules|public)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
};

const webpackDev = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: PATHS.build,
    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    // Display only errors to reduce the amount of output.
    stats: "errors-only",

    // Parse host and port from env so this is easy to customize.
    host: process.env.HOST,
    port: process.env.PORT,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    process.env.ANALYZE === "true" ? new BundleAnalyzerPlugin() : null,
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["bundle"],
      title: "Koppermann Mobile Objects",
      favicon: "./resources/favico.ico",
      // Load a custom template (lodash by default see the FAQ for details)
      template: "./html/index.html",
      filename: "index.html",
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ].filter(Boolean),
};

const webpackPrd = {
  mode: "production",
  plugins: [
    process.env.ANALYZE === "true" ? new BundleAnalyzerPlugin() : null,
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["bundle"],
      title: "Koppermann Mobile Objects",
      favicon: "./resources/favico.ico",
      // Load a custom template (lodash by default see the FAQ for details)
      template: "./html/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(PATHS.clean),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // add to module contatenation on web version - for cordova its bad

    // //bug in last veriosn, not allowing ugliy
    // new UglifyJsPlugin({
    // 	parallel: true,
    // 	uglifyOptions: {
    // 		compress: {
    // 			drop_console: true
    // 		},
    // 		dead_code: true
    // 	}
    // }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ].filter(Boolean),
};

console.log(`Compiling on ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === "production") {
  process.env.BABEL_ENV = "production";
  module.exports = merge(commomWebpack, webpackPrd);
} else {
  process.env.BABEL_ENV = "development";
  module.exports = merge(commomWebpack, webpackDev);
}
