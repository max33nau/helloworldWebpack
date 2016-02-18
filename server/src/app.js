'use strict';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const my = require('./config/configDBandServer');
const dbData = require('./database');
const mainPage = require('./routes/route-main');
const searchPlayers = require('./routes/route-playerInfo');

const Authenticat = require('authenticat');
const connection = dbData.mongoose.createConnection(my.dbConnect + my.dbName);
const authenticat = new Authenticat(connection);

/**** START THE APP ****/
 module.exports = function start() {
   var app = express();

   /**** VIEWS ****/
   var viewPath = path.join(__dirname, 'views');
   app.set('views', viewPath);
   app.use( express.static( viewPath, { redirect : false } ) );

   /**** PUBLIC ****/
   var publicPath = path.join( __dirname, 'public' );
   app.use(express.static( publicPath, { redirect : false } ) );


   /**** PARSING MODULES FOR APP ****/
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(cookieParser());

   /**** ROUTES ****/
   app.use('/user', authenticat.router); // Authentication
   app.use('/', mainPage());
   app.use('/players',authenticat.tokenAuth, searchPlayers(authenticat));

   /**** ERROR HANDLING ****/
   app.use(function(request,response,next) {
     var error = new Error('Not Found');
     error.status = 404;
     next(error);
   });
  var mainApp = {};

  mainApp.start = function(callback) {
    var server = app.listen(process.env.PORT || my.serverPort, function () {
      console.log('server is connected');
      dbData.start(function () {
        console.log('connected to database');
        callback();
      });
    });
    return {
      close: function close(callback) {
        server.close(function () {
          dbData.mongoose.connection.close(callback);
        });
      }
    };
  };
  mainApp.app = app;
  mainApp.authenticat = authenticat;
  return mainApp;
};
