const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
const paths = {
  src: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

let plugins = [
  new CleanWebpackPlugin(paths.dist),
  new HtmlWebpackPlugin({
    template: path.join(paths.src, "html", "app.html"),
    filename: path.join(paths.dist, "index.html"),
    inject: true,
    hash: false,
    minify: {
      removeComments: devMode ? false : true,
      collapseWhitespace: devMode ? false : true,
      minifyJS: devMode ? false : true,
      minifyCSS: devMode ? false : true
    }
  }),
  new CopyWebpackPlugin([{
    from: path.join(paths.src, "images", "*.{jpg,webp}"),
    to: path.join(paths.dist, "images"),
    flatten: true
  }])
];

if (devMode === false) {
  plugins.push(new UglifyJSPlugin({
    uglifyOptions: {
      warnings: true,
      ecma: 6
    }
  }));
}

module.exports = {
  output: {
    filename: devMode ? "js/[name].js" : "js/[name].[chunkhash:8].js",
    path: paths.dist,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/i,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/i,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  plugins: plugins
};
