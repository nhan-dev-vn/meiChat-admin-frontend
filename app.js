var app = angular.module('meiChat', ['ngSanitize', 'ngRoute', 'ngFileUpload'])
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/home/home.html",
            controller: 'home as home'
        })
        .when("/login", {
            templateUrl: "pages/login/login.html",
            controller: 'login as login'
        })
        .when("/message", {
            templateUrl: "pages/message/message.html",
            controller: 'message as message'
        })
        .otherwise({
            redirectTo: '/'
        })
})

