

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('search').addEventListener('click', questionSearch);
  chrome.tabs.getSelected(null, function(tab) {
    document.querySelector('#save_url').addEventListener('click', saveSearch);
    document.getElementById('showHistory').addEventListener('click', showHaystak);
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
  });
}

function questionSearch(){
  var question = document.getElementById('question').value;
  chrome.runtime.sendMessage({ type: "save_question", data: question});
}

function getHighlight(callback) {
  chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
  }, function(selection) {
    chrome.runtime.sendMessage({ type: "save_highlight", data: selection});
    callback();
  });
}

function showHaystak(){
 console.log(chrome.runtime.id);
 chrome.tabs.update({url: "chrome-extension://" + chrome.runtime.id +"/haystack.html?" });
}
