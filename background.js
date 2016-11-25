
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
    if (request.type === "save_question") {
      saveQuestion(request.data);
    }
    if (request.type === "save_url") {
      storeUrl(request.data);
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
      }
      matchedUrls.push(match);
      console.log(match)
    }
  });
  console.log(matchedUrls)
};


var getUrls = function(){
    return Object.keys(localStorage);
};

function storeUrl (url) {
  temporary["url"] = url;
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

Array.prototype.includes = function(searchElement) {
  if (this.indexOf(searchElement) === -1) {
    return false;
  } else {
    return true;
  }
};
