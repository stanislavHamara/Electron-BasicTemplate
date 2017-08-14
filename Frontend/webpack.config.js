const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],

    output: {
        filename: 'assets/bundle.js',
        sourceMapFilename: 'assets/bundle.js.map',
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        devtoolModuleFilenameTemplate: function (info) {
            return 'file:///' + info.absoluteResourcePath;
        }
    },

    module: {
        rules: [
            { test: /\.jsx?$/, loaders: ['babel-loader'], include: path.join(__dirname, 'src') },
            { test: /(\.css)$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/[name].[hash].[ext]' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/[name].[hash].[ext]' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=assets/[name].[hash].[ext]' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=assets/[name].[hash].[ext]' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=assets/[name].[hash].[ext]' },
            { test: /\.(jpg|png|jpeg)$/, loader: 'file-loader?name=assets/images/[name].[hash].[ext]' }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        })
    ],

    devtool: 'eval-source-map',

    resolve: {
        extensions: ['.js', '.jsx']
    },

    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        hot: true
    },
};
