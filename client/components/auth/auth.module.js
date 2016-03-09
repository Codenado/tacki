'use strict';

angular.module('tackiApp.auth', [
  'tackiApp.constants',
  'tackiApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
