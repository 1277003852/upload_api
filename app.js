const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');

var indexRouter = require('./routes/index');
var fileListRouter = require('./routes/file_list');
var fileUploadRouter = require('./routes/file_upload');
var fileDownloadRouter = require('./routes/file_download');
var fileDeleteRouter = require('./routes/file_delete');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* CORS Configuration */
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Setup Router */
app.use('/', indexRouter);
app.use('/fileList', fileListRouter);
app.use('/fileUpload', fileUploadRouter);
app.use('/fileDownload', fileDownloadRouter);
app.use('/fileDelete', fileDeleteRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
