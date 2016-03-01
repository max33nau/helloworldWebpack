'use strict';
var mongoose = require('mongoose');
var User = require('../.././models/model-user');
var jwt = require('jwt-simple');
var request_module = require('request');
var qs = require('querystring');
var moment = require('moment');
var config = process.env;

var user_handler = {};
mongoose.Promise = Promise;


var createJWT = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix() // token will expire after 14 days
  };
  return jwt.encode(payload, config.MY_SECRET_TOKEN); // Encodes our token in the database so people can't use it
}

user_handler.checkAuth = function(request,response) {
  var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
  var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
  var profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';

/* Verifies if the app has been registered, initializes the request from Satellizer,
to get your twitter keys go to the dev page for twitter and click manage your apps at the
bottom of a page and make sure to include a callback or you will get error */
  if (!request.body.oauth_token || !request.body.oauth_verifier) {
    var requestTokenOauth = {
      consumer_key: config.TWITTER_KEY,
      consumer_secret: config.TWITTER_SECRET,
      callback: request.body.redirectUri
    };

    // Post to the request token url to verify that this app has oauth authentication
    request_module.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, res, body) {
      if(err) {
        console.log(err);
      } else {
        var oauthToken = qs.parse(body);
        response.send(oauthToken);
      }
    });
  } else {
    /* after you have successfully got a oauthToken back you need to get your accessToken to access a userProfile info
     you will use the oauth_token and verifier to get your access token */
    var accessTokenOauth = {
      consumer_key: config.TWITTER_KEY,
      consumer_secret: config.TWITTER_SECRET,
      token: request.body.oauth_token,
      verifier: request.body.oauth_verifier
    };
     // posting this information to the accessToken url of twitter will give you back the o_auth tokens to access the users content
    request_module.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, res, accessInfo) {
      accessInfo = qs.parse(accessInfo);

      var profileOauth = {
        consumer_key: config.TWITTER_KEY,
        consumer_secret: config.TWITTER_SECRET,
        oauth_token: accessInfo.oauth_token
      };
      // If all our authorization is passed we will be allowed to access the users info
      request_module.get({
        url: profileUrl + accessInfo.screen_name,
        oauth: profileOauth,
        json: true
      }, function(err, res, profile) {
        /* Now we can add the user to our own database and send path the authorization token */
        var userInfo = {};
        User.findOne({twitter: profile.id})
          .then( function(user) {
            if(!!user) {
              userInfo.name = user.displayName;
              userInfo.token = createJWT(user);
              response.json(userInfo);
            }
            var newUser = new User();
            newUser.twitter = profile.id;
            newUser.displayName = profile.name;
            newUser.save()
              .then(function(user) {
                userInfo.name = user.displayName;
                userInfo.token = createJWT(user);
                response.json(userInfo);
              });
          })
          .catch(function(error) {
            console.log(error);
            response.end();
          });
        })
    })
  }
}


module.exports = user_handler;
