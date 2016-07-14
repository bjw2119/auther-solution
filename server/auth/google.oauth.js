'use strict';

var fs = require('fs');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../api/users/user.model');

var gApiSecretStr = fs.readFileSync('/home/barry/auther-secret.txt', 'utf8')
// console.log(gApiSecretStr);
var gApiSecretObj = JSON.parse(gApiSecretStr);
// console.log(gApiSecretObj);
module.exports = new GoogleStrategy(gApiSecretObj, function (token, refreshToken,  profile, triggerSerializationOfUser) {
  // this only runs when somebody logs in through google
  User.findOrCreate({
    where: {googleId: profile.id},
    defaults: {
      email: profile.emails[0].value,
      name: profile.displayName,
      photo: profile.photos[0].value
    }
  })
  .spread(function (user) {
    triggerSerializationOfUser(null, user);
  })
  .catch(triggerSerializationOfUser);
});
