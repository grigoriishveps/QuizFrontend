let path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.js", // входная точка - исходный файл
    output:{
        path: path.join(__dirname, '/dist'),     // путь к каталогу выходных файлов - папка public
        filename: "index_bundle.js"       // название создаваемого файла
    },
    module:{
        rules:[{
                test: /\.js$/, // определяем тип файлов
                exclude: /node_modules/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"] // используемые плагины
                }
                // use: {
                //     loader: "babel-loader"
                // },
            },
            // {
            //     test: /\.(png|jpg|gif|svg)$/,
            //     use: [
            //         // 'cache-loader',
            //         {
            //             loader: 'file-loader?name=./image/[hash].[ext]'
            //         },
            //
            //     ]
            // },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ],
    devServer: {
        port: 8080
    }
}