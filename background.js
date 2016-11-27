var a;
var h;
var t;
var data;
var enabled = true;

function isExtensionEnabled(){
  enabled = !enabled;
  if (enabled===true){
    chrome.browserAction.setBadgeText({text: "on"});
    localStorage.setItem("status", "on");
  }
  if (enabled===false){
    chrome.browserAction.setBadgeText({text: "OFF"});
    localStorage.setItem("status", "OFF");
  }
}

function storeQuestion (question, callback) {
  if(enabled === true){
    localStorage.setItem("newest question", question);
    callback(question);
  }
}

chrome.runtime.onMessage.addListener(
  function(request) {
    if(localStorage.getItem("status") === "on"){
      if (request.type === "save_question") {
        storeQuestion (request.data, search);
      }
      if (request.type === "save_highlight") {
        h = request.data;
      }
      if (request.type === "save_url") {
        saveItem(request.data);
      }
      if (request.type === "save_tag") {
        t = request.data;
      }
    }
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type === "sendArray"){
        matchUrls(request.data);
        sendResponse(
          matchedUrls
        );
        matchedUrls = [];
      }
    });

    var matchedUrls = [];

    var matchUrls = function (requestData){
      var googleUrls = requestData;
      var storedUrls = getUrls();
      googleUrls.forEach(function(url){
        if (storedUrls.includes(url) === true) {
          var match = {
            [url]: localStorage[url]
          };
          matchedUrls.push(match);
        }
      });
    };

    var getUrls = function(){
      return Object.keys(localStorage);
    };

    function saveItem(url) {
      var savedQuestion = localStorage.getItem("newest question");
      localStorage.setItem(url, JSON.stringify({ question: savedQuestion, highlight: h, tags: t, date: new Date()}));
    }

    function search(question) {
      if(enabled === true){
        question.split(' ').join('+');
        chrome.tabs.update({"url": "https://www.google.co.uk/search?q="+question, "selected": true});
      }
    }
    Array.prototype.includes = function(searchElement) {
      if (this.indexOf(searchElement) === -1) {
        return false;
      } else {
        return true;
      }
    };
