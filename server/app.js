var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var routes = require('./routes');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/app/')));
app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (error, req, res, next) {
    console.log(error);
    if(error && error.status){
        res.status(error.status);
    }else{
        res.status(500);
    }
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(__dirname + "/views/404.html", function (err, data) {
        if (err){
            res.end("<h1>404 Not Found !</h1>");
        }
        res.end(data);
    });
});

module.exports = app;
