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
