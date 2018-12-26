const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const devMode = isDevBuild ? 'development' : 'production';

    return {
        mode: devMode,
        stats: { modules: false },
        context: __dirname,
        entry: { app: './ClientApp/main.ts' },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: ['css-loader', 'sass-loader'],
                        fallback: 'style-loader'
                    })
                },
                {
                    test: /\.(png|jpg|gif|svg|ttf|woff|woff2|eot|ico)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        devServer: {
            historyApiFallback: true,
            noInfo: true
        },
        performance: {
            hints: false
        },
        devtool: isDevBuild ? '#eval-source-map' : '#source-map',
        plugins: [
            new VueLoaderPlugin(),
            new ExtractTextPlugin('app.css'),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            })
        ].concat(isDevBuild ? [] : [
            new UglifyJsPlugin()
        ])
    };
};