const log4js = require('log4js');
const { env, logLevel } = require('config');

log4js.levels = logLevel;

// config
log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: {
      type: 'file',
      filename: 'logs/app.log',
      maxLogSize: 10485760,   // 10MB
      numBackups: 5,
    },
  },
  categories: {
    default: {
      appenders: ['console', 'file'],
      level: 'debug',
    },
    app: {
      appenders: ['console', 'file'],
      level: 'debug',
    },
  },
});

// options for connectLogger
// ### AUTO LEVEL DETECTION
// http responses 3xx, level = WARN
// http responses 4xx & 5xx, level = ERROR
// else.level = INFO
// ### FORMAT
// ':remote-addr - -' +
// ' ":method :url HTTP/:http-version"' +
// ' :status :content-length ":referrer"' +
// ' ":user-agent"';
const options = {
  level: 'auto',
  format: env === 'development' ? ':method :url :status :content-length (:remote-addr)' : null,
};


module.exports.configure = (app) => {
  app.use(log4js.connectLogger(log4js.getLogger('app'), options));
};

module.exports.getLogger = log4js.getLogger;
