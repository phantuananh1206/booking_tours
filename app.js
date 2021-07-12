var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var session = require('express-session');
require('dotenv').config();

var app = express();

const route = require('./routes');
const db = require('./config/db');

db.connect();

app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 3600000 },
    }),
);

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

// view engine setup
app.engine(
    'hbs',
    exphbs({
        extname: 'hbs',
        helpers: {},
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/public')));
process.env.TZ = 'Asia/Ho_Chi_Minh';
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

route(app);

module.exports = app;
