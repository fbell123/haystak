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
   var questionAnswerPair = "<li>" + "<div class='content-container'>" + "<a href='" + keyTitle + "' target='_blank'>" + keyTitle + "</a>" + "<br><div class='para-header'>Q:</div>" + "<div class='para-content'>" + questionValue + "</div>" + "<div class='para-header'>A:</div>" + "<div class='para-content'>" + highlightValue + "</div></div><br></li>";
   list.innerHTML += questionAnswerPair;
 }
};
