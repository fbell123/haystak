
var enabled;
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('search').addEventListener('click', questionSearch);
  chrome.tabs.getSelected(null, function(tab) {
    document.querySelector('#save_url').addEventListener('click', saveSearch);
    document.getElementById('showHistory').addEventListener('click', showHaystak);
    document.getElementById('helpPage').addEventListener('click', showHelp);
    document.getElementById('onOff').addEventListener('click', onOff);
  }
);
});
function onOff(){
  enabled = !enabled;
  if (enabled){
    document.getElementById('currentLink').innerHTML = "ON";
  }
  if (!enabled) {
      document.getElementById('currentLink').innerHTML = "OFF";
  }
  window.close();
}

function saveSearch() {
  getTag();
  getHighlight(getUrl);
  window.close();
}

function getUrl(){
  chrome.tabs.getSelected(null, function(tab) {
    var url = tab.url;
    document.getElementById('currentLink').innerHTML = url;
    chrome.runtime.sendMessage({ type: "save_url", data: url});
  });
}


function getTag(){
  var tag = document.getElementById('tag').value;
  chrome.runtime.sendMessage({ type: "save_tag", data: tag});
}


function questionSearch(){
  var question = document.getElementById('question').value;
  chrome.runtime.sendMessage({ type: "save_question", data: question});
  window.close();
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
 chrome.tabs.update({url: "chrome-extension://" + chrome.runtime.id +"/haystak.html?" });
 window.close();
}
function showHelp(){
 chrome.tabs.update({url: "chrome-extension://" + chrome.runtime.id +"/instructions.html?" });
 window.close();
}
