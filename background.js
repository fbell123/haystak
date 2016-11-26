
var q;
var h;
var t;
var data;
var questarray = [];
var temporary = {
  "data": {
    "question": "",
    "tag": "",
    "highlight": ""
  },
  "url": ""
};

function storeQuestion (question, callback) {
  localStorage.setItem("newest question", question);
  callback(question);
  // localStorage.setItem(temporary.data.question);
}

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.type === "save_question") {
      storeQuestion (request.data, search);
    }
    if (request.type === "save_highlight") {
      h = request.data;
    }
    if (request.type === "save_url") {
      storeUrl(request.data, saveItem);
    }
    if (request.type === "save_tag") {
      t = request.data;
    }
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type === "sendArray"){
        matchUrls(request.data);
        console.log(matchedUrls);
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
          console.log(match);
        }
      });
      console.log(matchedUrls);
    };


    var getUrls = function(){
      return Object.keys(localStorage);
    };

    function storeUrl (url, callback) {
      data = { question: q, highlight: h, tags: t};
      callback(url);
    }
    function saveItem(url) {
      var savedQuestion = localStorage.getItem("newest question");
      localStorage.setItem(url, JSON.stringify({ question: savedQuestion, highlight: data.highlight, tags:data.tags }));
    }

    function search(question) {
      question.split(' ').join('+');
      chrome.tabs.update({"url": "https://www.google.co.uk/search?q="+question, "selected": true});
    }

    function saveTag(tag) {
      temporary["data"]["tag"] = tag;
      console.log(tag);
    }

    Array.prototype.includes = function(searchElement) {
      if (this.indexOf(searchElement) === -1) {
        return false;
      } else {
        return true;
      }
    };
