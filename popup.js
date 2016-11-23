document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('search').addEventListener('click', questionSearch);
  chrome.tabs.getSelected(null, function(tab) {
    document.querySelector('#save_url').addEventListener('click', getUrl);
  }
);
});

function getUrl(){
  chrome.tabs.getSelected(null, function(tab) {
    var url = tab.url;
    getHighlight();
    document.getElementById('currentLink').innerHTML = url;
    chrome.extension.getBackgroundPage().storeUrl(url);
  });
}

function questionSearch(){
  var question = document.getElementById('question').value;
  chrome.extension.getBackgroundPage().saveQuestion(question);
}

function getHighlight() {
chrome.tabs.executeScript( {
               code: "window.getSelection().toString();"
           }, function(selection) {

              chrome.extension.getBackgroundPage().saveHighlight(selection);
           });
         }
