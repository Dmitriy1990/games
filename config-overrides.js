const { override, disableEsLint, overrideDevServer, watchAll } = require('customize-cra');
const CompressionPlugin = require('compression-webpack-plugin'); //gzip
const BrotliPlugin = require('brotli-webpack-plugin'); //brotli

module.exports = {
  webpack: override(
    // usual webpack plugin
    disableEsLint()
  ),
  devServer: overrideDevServer(
    // dev server plugin
    watchAll()
  ),
  plugins: [
    new CompressionPlugin({
      //gzip plugin
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }),
    new BrotliPlugin({
      //brotli plugin
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
