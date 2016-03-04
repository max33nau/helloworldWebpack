exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./src/tests/e2e/*.js'],
  capabilities:
    {
      browserName: 'chrome'
    },
  baseUrl: 'http://localhost:3333',
  allScriptsTimeout: 11000,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
}
