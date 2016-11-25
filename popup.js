document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('search').addEventListener('click', questionSearch);
  chrome.tabs.getSelected(null, function(tab) {
    document.querySelector('#save_url').addEventListener('click', saveSearch);
    // document.getElementById('save_url').addEventListener('click', saveSearch);
  }
);
});

function saveSearch() {
  console.log("test");
  console.log(getTag.toString())
  getTag();
  console.log(1);
  getHighlight(getUrl);
}
function getUrl(){
  chrome.tabs.getSelected(null, function(tab) {
    var url = tab.url;
    console.log(tab.url)
    document.getElementById('currentLink').innerHTML = url;
    chrome.runtime.sendMessage({ type: "save_url", data: url});
  });
}


function getTag(){
  console.log("hello");
  var tag = document.getElementById('tag').value;
  console.log(tag);
  chrome.runtime.sendMessage({ type: "save_tag", data: tag});
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
