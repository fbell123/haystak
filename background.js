
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
