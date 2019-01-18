const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    //entry入口文件
    entry: {
        app: './src/js/index.js',
        print: './src/js/print.js'
    },
    // output出口文件
    output: {
        // [name]就可以将出口文件名和入口文件名一一对应
        // 添加hash可以防止文件缓存，每次都会生成4位的hash串
        filename: "[name].[hash:4].js",  // 打包后会生成index.js和print.js文件
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    // devServer开发服务器配置
    devServer: {                        //webpack-dev-server 能够实时重新加载
        contentBase: path.join(__dirname, "dist"),
        port: 3000,
        hot: true
    },
    // module处理对应模块
    module: {
        rules: [
            //test 用于标识出应该被对应的 loader 进行转换的某个或某些文件。
            //use 表示进行转换时，应该使用哪个 loader。
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: 'css-loader'
                })
                /* use: ['style-loader', 'css-loader']
                    也可以这样写，这种方式方便写一些配置参数
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'}
                    ]
                */
            },
            //加载图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            //加载字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            //加载数据
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            //转义ES6兼容低版本浏览器
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: /src/,           //只转化src目录下的js
                exclude: /noder_modules/  //排除掉node_modules，优化打包速度
            }
        ]
    },
    // plugins对应的插件
    plugins: [
        new CleanWebpackPlugin(['dist']), //打包之前清理dist文件夹里面多余的文件

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({           //设定HtmlWebpackPlugin，默认生成index.html
            template: './src/html/index.html',  //模板文件路径所在位置
            filename: 'index.html',
            chunks: ['index'],            //对应的文件
            hash: true                    //会在打包好的js后面加上hash串
        }),
        new HtmlWebpackPlugin({
            template: './src/html/print.html',
            filename: 'print.html',
            chunks: ['print'],
            hash: true
        }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin('css/style.css')
    ]
};