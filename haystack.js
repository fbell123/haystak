window.onload = function () {
  var list = document.getElementById('search-history');
  listHistory(list);
};

var listHistory = function (list) {
 for (var i = 0; i < localStorage.length; i++) {
   if (localStorage.key(i) == "newest question") { continue;}
   var keyTitle = localStorage.key(i);
   var keyValue = localStorage.getItem(keyTitle);
   var obj = JSON.parse(keyValue);
   var questionValue = obj.question;
   var highlightValue = obj.highlight;
   var tagValue = obj.tag;
   var questionAnswerPair = "<li>" + "<a href='" + keyTitle + "' target='_blank'>" + keyTitle + "</a>" + "<p>Your question: " + questionValue + "<br>Your selected answer: " + highlightValue + "<br>Your tags: " + tagValue + "</p><br><br></li>";
   list.innerHTML += questionAnswerPair;
 }
};

// var deleteListing = function(listing) {
//   localStorage.removeItem(listing);
// }; NOT WORKING

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('question').addEventListener('click', searchField);
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

// function questionSearch(){
//   var question = document.getElementById('question').value;
//   chrome.runtime.sendMessage({ type: "save_question", data: question});
// }

function getHighlight(callback) {
  chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
  }, function(selection) {
    console.log(selection);
    chrome.runtime.sendMessage({ type: "save_highlight", data: selection});
    callback();
  });
}
function searchField () {
    $("input#question").keypress(function (e) {
      var question = document.getElementById('question').value;
      chrome.runtime.sendMessage({ type: "save_question", data: question});
      e.preventDefault()
      // if(e.which == 13) {
      //     //submit form via ajax, this is not JS but server side scripting so not showing here
      //     $("#chatbox").append($(this).val() + "<br/>");
      //     $(this).val("");
      // questionSearch();
    });
}
