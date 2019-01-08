const htmlwebpack = require("html-webpack-plugin");
const extractcss = require("mini-css-extract-plugin");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

module.exports = (env, options) => {
    const config = {
        entry:['./src/index.js','react-hot-loader/patch'],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: { minimize: true}
                        }
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: extractcss.loader,
                            options:{
                                publicPath: '../'
                            }
                        },
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins:[
            new Dotenv({
                path: `./.env.${options.mode === "production" ? "prod" : "dev"}`
            }),
            new htmlwebpack({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new extractcss({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            contentBase: './dist',
            hot: true
        }
    }
    return config;
}