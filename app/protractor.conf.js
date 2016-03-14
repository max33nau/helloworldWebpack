exports.config = {
  framework: 'jasmine',
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
