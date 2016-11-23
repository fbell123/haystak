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
    document.getElementById('currentLink').innerHTML = url;
    chrome.extension.getBackgroundPage().storeUrl(url);
  });
}

function questionSearch(){
  var question = document.getElementById('question').value;
  chrome.extension.getBackgroundPage().saveQuestion(question);
}
