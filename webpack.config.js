const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const path = require('path');
const assetsDir = path.join(__dirname, "/build/resources/main/assets");
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    context: path.join(__dirname, '/src/main/resources/assets'),
    entry: {
        main: './main.less'
    },
    output: {
        path: assetsDir
    },
    resolve: {
        extensions: [".less"],
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader, options: {publicPath: '../'}},
                    {loader: 'css-loader', options: {sourceMap: !isProd, importLoaders: 1, url: false}},
                    {loader: 'less-loader', options: {sourceMap: !isProd}},
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
    ],
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map'
};
