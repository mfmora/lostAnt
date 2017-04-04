module.exports = {
  context: __dirname,
  entry: "./js/main.js",
  output: {
    path: "./js/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".jsx", ".js"]
  },
  devtool: 'source-maps'
};
