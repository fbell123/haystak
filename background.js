var storeQuestion = function (question) {
  localStorage.setItem('newest question', JSON.stringify(question));
};

var storeUrl= function (url) {
  var retrievedQuestion = JSON.parse(localStorage.getItem('newest question'));
  localStorage.setItem(retrievedQuestion,url);
  retrievedQuestion = nil;
};

var values = [];
var getUrls = function(){

    keys = Object.keys(localStorage),
    i = keys.length;
  while (i--) {
    values.push (localStorage.getItem(keys[i]));
  }
  return values;
}

var matchedUrls = []

chrome.runtime.onMessage.addListener(function(message, sender, response)) {
  if (message.message == "array") {
    getUrls();
    values.forEach {|value|
    if (sender.includes(value)) {
      matchedUrls.push(value);
      console.log(matchedUrls);
    }
  }
}


if (!Array.prototype.includes) {
 Array.prototype.includes = function(searchElement /*, fromIndex*/) {
   'use strict';
   if (this === null) {
     throw new TypeError('Array.prototype.includes called on null or undefined');
   }

   var O = Object(this);
   var len = parseInt(O.length, 10) || 0;
   if (len === 0) {
     return false;
   }
   var n = parseInt(arguments[1], 10) || 0;
   var k;
   if (n >= 0) {
     k = n;
   } else {
     k = len + n;
     if (k < 0) {k = 0;}
   }
   var currentElement;
   while (k < len) {
     currentElement = O[k];
     if (searchElement === currentElement ||
       (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
         return true;
       }
       k++;
     }
     return false;
   };
 }
