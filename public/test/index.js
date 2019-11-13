/* eslint-disable */

// include jsdom for DOM use in tests on travis
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM(``, {
    url: 'http://localhost:3000'
});
global.window = window;
global.document = window.document;
global.FormData = window.FormData;
global.localStorage = window.localStorage;
global.sessionStorage = window.sessionStorage;
global.URLSearchParams = window.URLSearchParams;

require = require('esm')(module);
module.exports = require('./tests.js');
