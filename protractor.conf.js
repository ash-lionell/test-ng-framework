// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

//const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 900000,
  specs: [
    './src/features/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  /*framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },*/
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ['./src/steps'],
    strict: true,
    tags: '@angular',
    format: ['json:reports/jsonOutput.json'/*, 'json:reports/json/cucumber_report.json'*/],
  },
  ignoreUncaughtExceptions: true,
  /*onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }*/
  afterLaunch: async function() {
    var cucumberReportOptions = {
        source: './reports/jsonOutput.json',
        dest: './reports',
        name: 'cucumber_report.html',
        title: 'Cucumber Report'
    };
    var report = require('cucumber-html-report');
    await report.create(cucumberReportOptions)
        .then(function () {
            //invoke cucumber-html-report
            console.log('cucumber_report.html created successfully!');
        })
        .catch(function (err) {
            if (err) {
                console.error(err);
            }
        });
  },
  onPrepare() {
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    var expect = chai.expect;
    global.expect=expect;
    global.until=browser.ExpectedConditions;
    browser.manage().window().maximize();
  },
  params: {
    url: 'http://localhost:4200/',
    timeouts: {
        maxTimeout: 90000,
        visibility: 20000
    }
  }
};
