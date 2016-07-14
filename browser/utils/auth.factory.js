'use strict';

app.factory('Auth', function ($http) {

  var currentUser ={};
  return {
    login: function (info) {
      return $http.post('/auth/login', info)
      .then(function (response) {
        currentUser = response.data;
      });
    },
    signup: function (info) {
      return $http.post('/auth/signup', info)
      .then(function (response) {
        currentUser = response.data;
      });;
    },
    fetchCurrentUser: function () {
      return $http.get('/auth/me')
      .then(function (response) {
        return response.data;
      });
    },
    logout: function () {
      return $http.get('/auth/logout')
      .then(function () {
        currentUser = null;
      });
    },
    getCurrentUser: function(){return currentUser;}
  }
});
