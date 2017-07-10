const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { env, port } = require('config');

const logger = require('./lib/logger');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// configure logger
logger.configure(app);


require('./routes')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error response
  res.status(err.status || 500);
  res.send(err);
});


app.listen(port, () => {
  logger.getLogger().info('Express server listening at http://localhost:%d/, in %s mode', port, env);
});
