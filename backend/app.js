var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categorieRouter = require('./routes/categories');
var postRouter = require('./routes/articles');
var commentRouter = require('./routes/commentaires');
var auth =require("./middleware/auth");
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// les apis de notre site
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category',categorieRouter);
app.use('/post',postRouter);
app.use('/comment',commentRouter);
app.use('/auth',auth);

/***  test for bilio faker */

module.exports = app;
