const path = require("path"); //可以幫我們產生absolute path
const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer"),
];

module.exports = {
  entry: "./app/assets/scripts/App.js", //relative path
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app"), //absolute path
  },

  devServer: {
    before: function (app, server) {
      server._watch("./app/**/*.html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0",
  },

  mode: "development",

  module: {
    rules: [
      // if running a css file, what should webpack do?
      {
        //handle the file that ended with .css
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          { loader: "postcss-loader", options: { plugins: postCSSPlugins } },
        ],
      },
    ],
  },
};
