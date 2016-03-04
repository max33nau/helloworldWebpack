const webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {}; // Entry point from the referenced webpack config has to be removed or test will fail


module.exports = function(config) {
  config.set({
    basePath:'',
    frameworks: ['mocha', 'chai'],
    port: 9876,
    preprocessors: {
      './src/app.js' : ['webpack'], // specifies the entry point in karma
      './src/tests/unit/*.js': ['babel']
    },
    files: [
      './src/app.js',
      'node_modules/angular-mocks/angular-mocks.js',
      './src/tests/unit/**/*.js'
    ],
    exclude: [],
    reporters: ['progress'],

    webpack: webpackConfig,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome', 'Safari'],
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity

  })
}
