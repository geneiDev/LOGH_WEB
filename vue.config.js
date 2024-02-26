const path = require('path');

module.exports = {
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          indentedSyntax: false
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'crypto-js': require.resolve('crypto-js'),
      },
    },
    output: {
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[name].[hash].js',
    },
  },
  assetsDir: 'assets',
  publicPath: './',
};
