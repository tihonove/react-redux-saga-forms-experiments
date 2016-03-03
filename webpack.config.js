module.exports = {
    entry: {
        'index': ['regenerator/runtime', './index.js']
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
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['transform-decorators-legacy']
                }
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
    }
};