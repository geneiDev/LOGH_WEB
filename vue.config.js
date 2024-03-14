const path = require('path');

module.exports = {
  transpileDependencies: true,
  devServer: {
    port: 8080
  },
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
  chainWebpack: (config) => {
    config.module
      .rule('xlsx')
      .test(/\.(xlsx|xls|csv)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'static/[name].[ext]',
      })
      .end();
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
