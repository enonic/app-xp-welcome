const path = require('path');
let PropertiesReader = require('properties-reader');
const file = path.join(__dirname, '/browser.properties');
const properties = PropertiesReader(file);
const browser_version = properties.get('browser.version');
exports.config = {

    specs: [
        path.join(__dirname, './specs/*.spec.js')
    ],

    maxInstances: 1,
    // Chrome runs with --headless, so no X display is needed. Without this, @wdio/local-runner wraps every
    // worker in xvfb-run, and on ubuntu-26.04 (xorg-server 21.1.22+) xvfb-run takes over fd 3, which is the
    // worker's IPC channel: every worker dies on its first process.send() with 'write EINVAL'.
    autoXvfb: false,

    capabilities: [{
        browserName: 'chrome',
        browserVersion: browser_version,
        "wdio:enforceWebDriverClassic": true,
        'goog:chromeOptions': {
            "args": [
                "--headless", "--disable-gpu", "--no-sandbox",
                "--lang=en",
                '--disable-extensions',
                'window-size=1970,1000',

            ]
        }
    }],
    logLevel: 'info',
    //
    // Enables colors for log output.
    coloredLogs: true,

    baseUrl: 'http://localhost:8080',
    //
    // Default timeout for all waitForXXX commands.
    waitforTimeout: 3000,
    strictSelectors: false,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 160000,
    //
    // Default request retries count
    connectionRetryCount: 3,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    },
    // Set directory to store all logs into
    outputDir: "./build/reports/logs/",

    reporters: ['concise',
        ['allure', {outputDir: './build/reports/allure', disableWebdriverStepsReporting: true, disableWebdriverScreenshotsReporting: true,}],
    ],

    // Hook that gets executed before the suite starts
    beforeSuite: function (suite) {
        browser.url(this.baseUrl);
    },
};
