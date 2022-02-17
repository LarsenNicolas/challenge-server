var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var app = express();

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.connect('mongodb+srv://admin:admin@cluster0.nwfwr.mongodb.net/Challenge?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/upload', require('./routes/createVideo'));
app.use('/videos', express.static('media'));
app.use('/videoList', require('./routes/videoList'));
app.use('/video', require('./routes/videoById'));
app.use('/updateVideo', require('./routes/updateVideo'));
app.use('/deleteVideo', require('./routes/deleteVideo'));
app.use('/favoriteVideoList', require('./routes/favoriteVideoList'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
