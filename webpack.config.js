const resolve = require("path").resolve;
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const url = require("url");
const { VueLoaderPlugin } = require('vue-loader');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const publicPath = "";

module.exports = (options = {}) => ({
	entry:{
		vendor:"./src/vendor",
		index:"./src/main.js"
	},
	output:{
		path:resolve(__dirname,"dist"),
		filename:options.dev ? "js/[name].js" : "js/[name].js?[chunkhash]",
		chunkFilename:"js/[name].js",
		publicPath:options.dev ? "http://127.0.0.1:8090/assets/" : publicPath
	},
	module:{
		rules:[
			{
				test:/\.vue$/,
				loader:"vue-loader"
			},{
				test:/\.js$/,
				use:["babel-loader"],
				exclude:/node_modules/
			},{
				test:/\.css$/,
				use:["style-loader","css-loader","postcss-loader"]
			},{
				test:/\.(png|jpg|jpeg|git|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				use:[{
					loader:"url-loader",
					options:{
						limit:10000,
						name:"img/[name].[ext]?[hash:7]"
					}
				}]
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:"src/index.html"
		}),
		new VueLoaderPlugin()
	],
	resolve:{
		alias:{
			"~":resolve(__dirname,"src"),
			"config$":options.dev ? resolve("src/config/config.dev.js"):resolve("src/config/config.production.js")
		}
	},
	optimization: {
	    runtimeChunk: {
	        name: "manifest"
	    },
	    splitChunks: {
	        cacheGroups: {
	            commons: {
	                test: /[\\/]node_modules[\\/]/,
	                name: "vendor",
	                chunks: "all"
	            }
	        }
	    }
	},
	devServer:{
		host:"127.0.0.1",
		port:"8090",
		proxy:{
			"/dev/":{
				target:"http://www.weather.com.cn",
				changeOrigin:true,
				pathRewrite:{
					"^/dev":""
				}
			}
		},
		historyApiFallback:{
			index:url.parse(options.dev?"http://127.0.0.1:8090/assets/":publicPath).pathname
		}
	},
	devtool:options.dev?"#inline-source-map":"#source-map"
})