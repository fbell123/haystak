window.onload = function () {
  var list = document.getElementById('search-history');
  listHistory(list);
};

var listHistory = function (list) {
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) == "newest question") { continue;}
    var key = localStorage.key(i);
    var keyValue = localStorage.getItem(key);
    var questionAnswerPair = "<li>" + key + ": " + "<a href='" + keyValue + "' target='_blank'>" + keyValue + "</a></li>";
    list.innerHTML += questionAnswerPair;
  }
};
