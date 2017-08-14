const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const { resolve } = require('path');

const webpackConfig = function () {
    const buildDir = '../Electron/ui'
    return {
        context: __dirname,
        entry: './src/index.jsx',
        externals: [
            (function () {
                const IGNORES = [
                    'electron'
                ];
                return function (context, request, callback) {
                    if (IGNORES.indexOf(request) >= 0) {
                        console.log('Request for ' + request);
                        return callback(null, 'require(\'' + request + '\')');
                    }
                    return callback();
                };
            })()
        ],
        devtool: 'source-map',
        output: {
            path: resolve(__dirname, buildDir),
            filename: 'index.js'
        },
        module: {
            rules: [
                { test: /\.(js|jsx)?$/, loader: 'babel-loader', include: path.join(__dirname, 'src') },
                {
                    test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract({
                        loader: [
                            { loader: 'css-loader', options: { sourceMap: true } },
                            { loader: 'postcss-loader' },
                            { loader: 'resolve-url-loader' },
                            { loader: 'sass-loader', options: { sourceMap: true } }
                        ]
                    })
                },
                { test: /\.jpe?g$|\.svg$|\.gif$|\.png$/i, loader: 'url-loader', options: { name: './assets/[name].[ext]', limit: 10000 } },
                { test: /\.otf$|\.woff$|\.woff2$|\.eot$|\.ttf$/, loader: 'url-loader', options: { name: './assets/[name].[ext]', limit: 10000 } }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: 'body'
            }),
            new WebpackNotifierPlugin()
        ]
    }
};

module.exports = webpackConfig;
