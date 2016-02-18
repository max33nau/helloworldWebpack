const webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {}; // Entry point from the referenced webpack config has to be removed or test will fail


module.exports = function(config) {
  config.set({
    basePath:'',
    frameworks: ['mocha', 'chai'],
    port: 9876,
    preprocessors: {
      './webpack/app.js' : ['webpack'], // specifies the entry point in karma
      './webpack/tests/*.js': ['babel']
    },
    files: [
      './webpack/app.js',
      'node_modules/angular-mocks/angular-mocks.js',
      './webpack/tests/*.js'
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
