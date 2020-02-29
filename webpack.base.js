module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  watchOptions: {
    ignored: ["node_modules/**"]
  }
};
