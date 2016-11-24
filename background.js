
var temporary = {
  "data": {
    "question": "",
    "tag": "",
    "highlight": ""
  },
  "url": ""
};

function storeQuestion (question) {
   temporary["data"]["question"] = question;
}

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.type === "save_highlight") {
  saveHighlight(request.data);
    }
    else if (request.type === "save_question") {
      saveQuestion(request.data);
    }
    else if (request.type === "save_url") {
      storeUrl(request.data);
    }
  });


var values = [];
var getUrls = function(){

    keys = Object.keys(localStorage),
    i = keys.length;
  while (i--) {
    values.push (localStorage.getItem(keys[i]));
  }
  return values;
};

var matchedUrls = [];

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
function storeUrl (url) {
  temporary["url"] = url;
  // chrome.tabs.executeScript( {
  //               code: "window.getSelection().toString();"
  //           }, function(selection) {
  //               console.log(selection);
  //           });
  localStorage.setItem(temporary["url"],JSON.stringify(temporary["data"]));
}

function search(question) {
  question.split(' ').join('+');
  chrome.tabs.update({"url": "https://www.google.co.uk/search?q="+question, "selected": true});
}

function saveQuestion(question){
storeQuestion(question);
  search(question);
}

function saveHighlight(selection) {
  temporary["data"]["highlight"] = selection;
}
