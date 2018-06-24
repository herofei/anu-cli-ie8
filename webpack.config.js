const path = require('path');
const webpack = require('webpack');

console.log('输出', path.resolve(__dirname, 'dist'));

module.exports = {
    // entry: './src/index.js',
    entry: {
        polyfill: [
            'core-js',
            'es5-shim',
            'es5-shim/es5-sham'
        ],
        bundle: [
            './src/index.js'
        ]
    },
    output: {
        filename: '[name].js',
        publicPath: "/assets/",
        path: path.resolve(__dirname, 'dist')
    },
    'mode': 'development',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'env',
                                {
                                    targets: {
                                        browsers: ['last 2 versions', 'ie >= 7'],
                                    },
                                    // modules: 'commonjs',
                                    useBuiltIns: true,
                                    debug: false,
                                },
                            ],
                            'react',
                            'stage-2',
                        ],
                        // ,
                        // plugins: ['transform-runtime', 'import'],
                        plugins: [
                            "transform-es3-property-literals",
                            "transform-es3-member-expression-literals",
                            "transform-es2015-modules-simple-commonjs"
                        ]
                    },
                },
                exclude: /node_modules|vendor|bootstrap/
            },
            // {
            //     test: /\.js$/,
            //     use: 'babel-loader',
            //     exclude: /node_modules|vendor|bootstrap/
            // },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // {
            //     test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            //     use: [{
            //         loader: 'url-loader',
            //         options: {
            //             limit: 100,
            //             name: 'asset/[name].[ext]',
            //         }
            //     }]
            // },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // react: 'anujs',
            // 'react-dom': 'anujs',
            'react': 'anujs/dist/ReactIE',
            'react-dom': 'anujs/dist/ReactIE',
            // This is mainly for IE6-8, because of the poor performance of the isPlainObject method in the official source code.
            'redux': 'anujs/lib/ReduxIE',
            'prop-types': 'anujs/lib/ReactPropTypes',
            'create-react-class': 'anujs/lib/createClass',
            // If you use the onTouchTap event on the mobile side
            'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin'
        }
    },
    devServer: {
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        hot: true,
        headers: {
            "X-Custom-Header": "yes"
        },
        historyApiFallback: true,
        inline: true, //注意：不要写colors:true，progress:true等，webpack2.x已不支持这些
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}