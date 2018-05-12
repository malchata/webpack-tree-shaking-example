const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
const paths = {
  src: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

module.exports = {
  entry: [path.join(paths.src, "index.js"), "preact"],
  output: {
    filename: devMode === true ? "js/[name].js" : "js/[name].[chunkhash:8].js",
    path: paths.dist,
    publicPath: "/"
  },
  resolve: {
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat",
      "create-react-class": "preact-compat/lib/create-react-class"
    }
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
  plugins: [
    new CleanWebpackPlugin(paths.dist),
    new HtmlWebpackPlugin({
      template: path.join(paths.src, "html", "app.html"),
      filename: path.join(paths.dist, "index.html"),
      inject: true,
      hash: false,
      minify: {
        removeComments: devMode === true ? false : true,
        collapseWhitespace: devMode === true ? false : true,
        minifyJS: devMode === true ? false : true,
        minifyCSS: devMode === true ? false : true
      }
    }),
    new CopyWebpackPlugin([{
      from: path.join(paths.src, "images", "*.{jpg,webp}"),
      to: path.join(paths.dist, "images"),
      flatten: true
    }])
  ]
};
