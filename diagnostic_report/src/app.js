var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var orders = require('./routes/orders');
var reports = require('./routes/reports');
var launch = require('./routes/lanuch.js');
var tmp = require('./routes/tmp.js');
var req_auth = require('./routes/req_auth.js');
var auth = require('./controllers/auth.js');
var recv_redirect = require('./routes/recv_redirect.js');
var req_auth = require('./routes/req_auth.js');
var clinical_req_auth = require('./routes/recv_clinical_auth.js');
var data_trans = require('./routes/data_trans.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret:'dontpanic', access_token:'hello'}));
app.use('/static', express.static(path.join(__dirname, '/public')));
app.use('/', routes);
app.use('/fhir-app/', routes);
app.use('/users', users);
app.use('/orders', orders);
app.use('/reports', reports);
app.use('/fhir-app/launch.html', launch);
app.use('/fhir-app/tmp/', tmp);
app.use('/recv_redirect', recv_redirect);
app.use('/req_genomics_auth/', req_auth);
app.use('/req_clincial_auth/', clinical_req_auth);
app.use('/datas/', data_trans);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
