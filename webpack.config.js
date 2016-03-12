var webpack = require('webpack');

module.exports = {
    entry: {
        'index': ['regenerator/runtime.js', './index.js']
    },
    output: {
        path: 'dist',
        publicPath: '/dist/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(c|le)ss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(woff|woff2|eot|svg|ttf|gif|png)$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'local_modules'],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.OldWatchingPlugin()
    ]
};