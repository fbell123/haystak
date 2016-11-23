document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('search').addEventListener('click', questionSearch);
  chrome.tabs.getSelected(null, function(tab) {
    document.querySelector('#save_url').addEventListener('click', getUrl);
  }
);
});

function getUrl(){
  chrome.tabs.getSelected(null, function(tab) {
    document.getElementById('currentLink').innerHTML = tab.url;
    var url = tab.url;
    saveUrl(url);
  });
}

function search(question) {
  question.split(' ').join('+');
  chrome.tabs.update({"url": "https://www.google.co.uk/search?q="+question, "selected": true});
}

function saveQuestion(question){
  chrome.extension.getBackgroundPage().storeQuestion(question);
  search(question);
}
function saveUrl(url){
  chrome.extension.getBackgroundPage().storeUrl(url);
}

function questionSearch(){
  var question = document.getElementById('question').value;
  saveQuestion(question);
}
