"use strict";angular.module("scoreTrackerApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","LocalStorageModule"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]).config(["localStorageServiceProvider",function(a){a.setPrefix("scoreTrackerApp")}]),angular.module("scoreTrackerApp").controller("MainCtrl",["$scope","ScoreService",function(a,b){function c(){$("#scoreForm").find("input").first().focus()}function d(){a.scores=b.getList()}c(),d(),a.updateSummary=function(){a.summary=b.getSummary()},a.updateSummary(),a.addScore=function(e){b.create(e)&&(a.scoreForm&&a.scoreForm.$setPristine(),a.newScore={name:"",value:void 0},d(),a.updateSummary(),c())}}]),angular.module("scoreTrackerApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("scoreTrackerApp").factory("ScoreService",["localStorageService","Uuid",function(a,b){function c(){return _.isEmpty(k)&&(k=a.get(j)||[]),_.sortBy(k,"name")}function d(a){return h(a)?(a.uuid=b.generate(),k.push(a),g(),a):void 0}function e(a){_.remove(k,function(b){return b.uuid===a}),g()}function f(a){if(h(a)){var b=_.findIndex(k,function(b){return b.uuid===a.uuid});return k[b]=a,g(),a}}function g(){a.set(j,k)}function h(a){return a.name&&a.value&&"number"==typeof a.value}function i(){return{average:Math.round(_.reduce(k,function(a,b){return a+b.value},0)/k.length)||0,minimum:_.min(k,function(a){return a.value}).value||0,maximum:_.max(k,function(a){return a.value}).value||0}}var j="scores",k=[];return{create:d,getList:c,update:f,remove:e,getSummary:i}}]),angular.module("scoreTrackerApp").factory("Uuid",function(){return{generate:function(){for(var a=[],b="0123456789abcdef",c=0;36>c;c++)a[c]=b.substr(Math.floor(16*Math.random()),1);return a[14]="4",a[19]=b.substr(3&a[19]|8,1),a[8]=a[13]=a[18]=a[23]="-",a.join("")}}}),angular.module("scoreTrackerApp").directive("score",["ScoreService",function(a){return{restrict:"E",templateUrl:"../../views/score.directive.html",scope:{score:"=",updateSummary:"&"},link:function(b,c){b.showControls=!1,b.editing=!1,b.newScore=angular.copy(b.score),c.parent().bind("mouseenter",function(){b.$apply(function(){b.showControls=!0})}),c.parent().bind("mouseleave",function(){b.$apply(function(){b.showControls=!1})}),b.removeScore=function(d){a.remove(d),c.parent().remove(),b.updateSummary()},b.updateScore=function(c){a.update(c)&&b.score.value!==c.value&&b.updateSummary(),b.score=c,b.editing=!1},b.editMode=function(){b.newScore=angular.copy(b.score),b.editing=!0},b.cancel=function(){b.newScore=b.score,b.editing=!1}}}}]);