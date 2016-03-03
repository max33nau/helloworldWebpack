'use strict';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const moment = require('moment');
const my = require('./config/configDBandServer');
const dbData = require('./database');
const mainPage = require('./routes/route-main');
const auth = require('./routes/route-auth');
const searchPlayers = require('./routes/route-playerInfo');


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


   /**** ALLOW REQUEST FROM OTHER URLS ****/
   app.use( ( req, response, next ) => {
   	const url = '*';
   	response.header( 'Access-Control-Allow-Origin', url );
   	response.header( 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE' );
   	response.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
   	next();
   });

   /* CHECK AUTHORIZATION TOKEN MIDDLEWARE */
   function ensureAuthenticated(request, response, next) {
     if ( request.method === 'OPTIONS' ) {
       return next();
     }
     if (!request.header('Authorization')) {
       return response.status(401).send({ message: 'Please make sure your request has an Authorization header' });
     }
     var token = request.header('Authorization').split(' ')[1];
     var payload = null;
     var config = process.env;
     try {
       payload = jwt.decode(token, config.MY_SECRET_TOKEN);
     }
     catch (err) {
       return response.status(401).send({ message: err.message });
     }

     if (payload.exp <= moment().unix()) {
       return response.status(401).send({ message: 'Token has expired' });
     }
     request.user = payload.sub;
     next();
   }

   /**** ROUTES ****/
   app.use('/', mainPage());
   app.use('/auth', auth());
   app.use('/players',ensureAuthenticated, searchPlayers());

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
  return mainApp;
};
