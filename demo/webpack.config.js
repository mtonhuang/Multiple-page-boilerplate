const config = {
    entry: {    //入口
        app: './src/app.js',
        vendors: './src/vendors.js'
    },
    output: {   //输出
        filename: '[name].js',  //filename 用于输出文件的文件名
        path: __dirname + '/dist'    //目标输出目录path的绝对路径
    }
    // 写入到硬盘：./dist/app.js, ./dist/vendors.js
};

//webpack自身只理解JS,loader可以将所有类型的文件转换为webpack能够处理的有效模块
module.exports = {
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },  //test用于标识处应该被对应的loader进行转换的文件
            { test: /\.ts$/, use: 'ts-loader' }     //use表示进行转换时，使用哪个loader
        ]
    }
}
