
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
};

function storeUrl (url) {
  temporary["url"] = url;
  chrome.tabs.executeScript( {
                code: "window.getSelection().toString();"
            }, function(selection) {
                console.log(selection);
            });
  localStorage.setItem(temporary["url"],JSON.stringify(temporary["data"]));
};
function search(question) {
  question.split(' ').join('+');
  chrome.tabs.update({"url": "https://www.google.co.uk/search?q="+question, "selected": true});
}

function saveQuestion(question){
  chrome.extension.getBackgroundPage().storeQuestion(question);
  search(question);
}
