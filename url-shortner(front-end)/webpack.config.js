const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    output: {
        filename: 'index.js',
        path: __dirname + '/dist',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};