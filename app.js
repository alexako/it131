var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var index = require('./routes/index');
//var chat = require('./routes/chat');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'k1udgedit',
  database: 'projectDB'
});
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('connection', connection);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));

app.use('/', index);
//app.use('/chat', chat);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : '';

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

