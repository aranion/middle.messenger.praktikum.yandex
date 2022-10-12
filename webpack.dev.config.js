const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: ["@babel/polyfill", "./src/index.ts"],
  },
  output: {
    path: path.join(__dirname, "dist/public"),
    publicPath: "/",
    filename: "js/[name].js",
  },
  target: "web",
  devtool: "#source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      //   {
      //     test: /\.sass$/,
      //     use: ["style-loader", "css-loader", "sass-loader"],
      //   },
      // {
      //   test: /\.(png|jpg|svg|gif)$/,
      //   use: ["file-loader"],
      // },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      excludeChunks: ["server"],
    })
  ],
};
