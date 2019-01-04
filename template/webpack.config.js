const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const ExtractTextPlugin=require("extract-text-webpack-plugin")

module.exports = {
    mode: 'production',
  	entry: {
  		//index:'./src/js/index.js',
        packet:'./src/js/packet.js',
        collect:'./src/js/collect.js'
  	},//入口
  	output: {//出口
    	filename: 'js/[name].js',
    	path: __dirname + '/dist'
  	},
  	module: {
        rules: [
          	{
          		test: /\.css$/, use:ExtractTextPlugin.extract({
            	fallback:'style-loader',
	            use:[{
                //loader:'css-loader?name=./css/[name].[ext]',
	              loader:'css-loader',
	              options:{
                  name:'[name].[ext]',
	                minimize:true,//代码压缩
	              }
	            }],
            	publicPath:"../"
            })},//正则，表示后缀为css的文件
            {
            	test: /(\.jpg|\.png|\.jpeg|\.gif)$/,
            	use: [
                {
                  loader: 'file-loader',
                  options: {
                    //name: '[name].[ext]',
                    name:'[name].[ext]',
                    publicPath: "./images",
                    outputPath: "images/"
                  },
                }
              ]
            },//同理......
            {
            	test: /\.(woff|ttf|svg|eot|xttf|woff5)$/,
            	use:[
                {
                  // 'file-loader?name=./fonts/[name].[ext]',
                  loader:'file-loader',
                  options:{
                    name:'./fonts/[name].[ext]',
                    publicPath:'../'
                  }
                }
              ]

            },
            {
              test: /\.(html)$/,
              use: {
                  loader: 'html-loader',
                  options: {
                      attrs: ['img:src', 'img:data-src', 'audio:src'],
                      minimize: false
                  }
              }
            },
            	//后面的参数，limit是限制文件大小，name是指定打包到哪个文件，同时指明打包文件名字，类型
    		    {
    		  		test:/\.(jsx|js)$/,
    		  		use:{
    		    		loader:'babel-loader'
    		  		},
    		  		exclude:/node_modules/ //排除不编译node_modules文件
    			  },
            {
              test: /\.scss/,
              use: ExtractTextPlugin.extract({
              use:[
                {
                loader:'css-loader'
                },
                {
                loader:'sass-loader'
                }
              ],
                fallback:'style-loader'
              })
            },
            {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({ //分离less编译后的css文件
                    fallback:'style-loader',
                    use:['css-loader','less-loader']
                })
            },

        ]
    },
  	devServer: {
	  	contentBase: path.join(__dirname, "dist"),
	  	compress: true,
	  	host:'localhost',//服务器地址
	  	port: 8080,
	  	inline:true//实时刷新
	  },
  	plugins: [
  	    //new ExtractTextPlugin('index.css'),
        new ExtractTextPlugin('[name].css'),
        //new ExtractTextPlugin('collect.css'),
  	    new htmlWebpackPlugin({
          template: `./src/index.html`,
          filename: `index.html`,//改html的输出文件名index.html改为了a.hmtl,
          inject: true,
          chunks: ['packet'],
          minify:{
              //removeAttributeQuotes:true,//去除引号
              //removeComments:true,//去除注释
              removeEmptyAttributes:true,//去除空属性
              //collapseWhitespace:true//去除空格
          }
        }),
        // new ExtractTextPlugin('index.css'),
        new htmlWebpackPlugin({
            template: `./src/collect.html`,
            filename: `collect.html`,//改html的输出文件名index.html改为了a.hmtl,
            inject: true,
            chunks: ['collect'],
            minify:{
                //removeAttributeQuotes:true,//去除引号
                //removeComments:true,//去除注释
                removeEmptyAttributes:true,//去除空属性
                //collapseWhitespace:true//去除空格
            }
        })
   	]

};