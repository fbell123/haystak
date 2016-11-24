document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('search').addEventListener('click', questionSearch);
  chrome.tabs.getSelected(null, function(tab) {
    document.querySelector('#save_url').addEventListener('click', saveSearch);
  }
);
});

function saveSearch() {
  getHighlight(getUrl);
}
function getUrl(){
  chrome.tabs.getSelected(null, function(tab) {
    var url = tab.url;
    document.getElementById('currentLink').innerHTML = url;
    chrome.runtime.sendMessage({ type: "save_url", data: url});
    // chrome.extension.getBackgroundPage().storeUrl(url);
  });
}

function questionSearch(){
  var question = document.getElementById('question').value;
  chrome.runtime.sendMessage({ type: "save_question", data: question});
  // chrome.extension.getBackgroundPage().saveQuestion(question);
}

function getHighlight(callback) {
chrome.tabs.executeScript( {
               code: "window.getSelection().toString();"
           }, function(selection) {
             chrome.runtime.sendMessage({ type: "save_highlight", data: selection});
              // chrome.extension.getBackgroundPage().saveHighlight(selection);
          //  });
           callback();
        });
      }
