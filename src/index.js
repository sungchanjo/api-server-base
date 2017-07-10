/**
 * Node core does not decide to implement ES6 modules (import & export).
 * So now, we should use CommonJS modules (require & module.exports).
 * https://github.com/nodejs/node-eps/blob/master/002-es6-modules.md
 */

require('./app.js');
