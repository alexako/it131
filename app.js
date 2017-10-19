var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var index = require('./routes/index');
//var chat = require('./routes/chat');

//mysql://b6f104e144b699:eee710dd@us-cdbr-iron-east-05.cleardb.net/heroku_7dfe969979d6a7b?reconnect=true
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_DATABASE
});
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

