import {HotModuleReplacementPlugin} from 'webpack';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {resolve} from 'path';
import {sass} from 'svelte-preprocess-sass';



function createConfig(_env, {mode = 'development'}) {
    const dev = mode === 'development';
    let plugins = [

        new Dotenv({safe: true}),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'template.html'),
        }),
        new MiniCssExtractPlugin(),
    ];
    if (dev) {
        plugins = [
            ...plugins,
            new HotModuleReplacementPlugin(),
            new WebpackBuildNotifierPlugin({
                title: 'Game Launcher',
                suppressSuccess: 'initial',
            }),
        ];
    }

    let devServer;
    if (dev) {
        devServer = {
            // quiet: true,
            port: 9000,
            hot: true,
            contentBase: resolve(__dirname, 'dist'),
            watchContentBase: true,
            historyApiFallback: true,
        };
    }

    const Loaders = [
        {
            test: /\.m?js$/,
            use: {
                loader: 'babel-loader',
            },
        },
        {
            enforce: 'pre',
            test: /\.(m?js)|(svelte)$/,
            exclude: /node_modules/,
            use: {
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            },
        },
        {
            test: /\.yaml/,
            use: ['json-loader', 'yaml-loader'],
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: dev,
                    },
                },
                'css-loader',
                'sass-loader',
            ],
        },
        {
            test : /\.svelte$/,
            use: {
                loader: 'svelte-loader',
                options: {
                    emitCss: true,
                    preprocess:  {
                        style: sass(),
                    },
                },
            },
        },
    ];

    const mainFields = ['module', 'main', 'svelte', 'browser', 'styles'];

    const alias = {
        '@': resolve(__dirname),
    };

    const extensions = ['.svelte', '.mjs', '.js', '.json', '.yaml', 'scss'];

    let devtool;
    if (dev) {
        devtool = 'source-map';
    } else {
        devtool = false;
    }
    let publicPath;
    if (dev) {
        publicPath = '/';
    } else {
        publicPath = '/ThankYouLindsey';
    }

    return [
        {
            devtool,
            context: resolve(__dirname),
            optimization: {
                minimize: !dev,
            },
            output: {
                filename: 'dist-renderer.js',
                path: resolve(__dirname, 'build'),
                publicPath,
            },
            resolve: {
                mainFields: mainFields,
                alias: alias,
                extensions,
            },
            name: "Lindsey's Card",
            entry: './main.js',
            mode,
            plugins: plugins,
            devServer: devServer,
            module: {
                rules: Loaders,
            },
        },
    ];
}

export default createConfig;
