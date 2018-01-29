const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // installed via npm
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

require('babel-polyfill');
// require("jquery");

const analyze = !!process.env.ANALYZE_ENV;
const paths = ['www/*.*', 'www/img', 'www/static'];

module.exports = {
    cache: false,
    devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map',
    plugins: process.env.NODE_ENV === 'production' ? [
        new CleanWebpackPlugin(paths),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new UglifyJsPlugin({
            parallel: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CopyWebpackPlugin([{
            from: './html'
        }, {
            from: './img',
            to: './img'
        }, {
            from: './static',
            to: './static'
        }])

    ] : [
        // new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new CopyWebpackPlugin([{
            from: './html'
        }, {
            from: './img',
            to: './img'
        }, {
            from: './static',
            to: './static'
        }])
    ],
    entry: [
        'babel-polyfill',
        './css/main.less',
        './js/main.jsx'
    ],
    output: {
        // default output path
        path: `${__dirname}/www/`,

        // cordova output path
        // path: './cordova/www/',

        // electron output path
        // path: './electron/main/',

        filename: 'bundle.js',
        publicPath: './'
    },
    module: {
        rules: [{
            test: /(\.js$|\.jsx?$)/,
            exclude: /(node_modules|public)/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['env', { modules: false }], 'stage-0', 'react-optimize', 'react'
                ]
            }
        }, {
            test: /\.css$/,
            exclude: /(node_modules|public)/,
            loader: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            exclude: /(node_modules|public)/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }, {
                loader: 'less-loader' // compiles Less to CSS
            }]
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }],
            include: /flexboxgrid/
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            exclude: /(node_modules|public)/,
            loader: ['url-loader?limit=10000&minetype=application/font-woff']
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            exclude: /(node_modules|public)/,
            loader: ['file-loader']
        },
        {
            test: /\.png/,
            loader: 'url-loader',
            exclude: /(node_modules|public)/,
            options: { limit: '100000', minetype: 'image/png' }
        },
        {
            test: /\.jpg/,
            exclude: /(node_modules|public)/,
            loader: ['file-loader']
        },
        {
            test: /\.gif/,
            exclude: /(node_modules|public)/,
            loader: ['file-loader']
        },
        {
            test: /\.webm/,
            exclude: /(node_modules|public)/,
            loader: 'file-loader'
        },
        {
            test: /\.mp4/,
            exclude: /(node_modules|public)/,
            loader: 'file-loader'
        }
        ]
    }
};
