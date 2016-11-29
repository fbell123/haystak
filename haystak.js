
window.onload = function () {
  var searchTags = document.getElementById('tagSearchSubmit');
  searchTags.addEventListener('click', tagSearch);
  var list = document.getElementById('search-history');
  listHistory(list);

};
 var keyTitle;
var listHistory = function (list) {
 for (var i = 0; i < localStorage.length; i++) {
   if (localStorage.key(i) == "newest question") { continue;}
   keyTitle = localStorage.key(i);
   var keyValue = localStorage.getItem(keyTitle);
   var obj = JSON.parse(keyValue);
   var questionValue = obj.question;
   var highlightValue = obj.highlight;
   var tagValue = obj.tags;
   var timeValue = ((obj.date).substring(0, 10));
   var questionAnswerPair = "<li>" + "<div class='content-container'>" + "<a href='" + keyTitle + "' target='_blank'>" + keyTitle + "</a>" + "<br><div class='para-header'>Q:</div>" + "<div class='para-content'>" + questionValue + "</div>" + "<div class='para-header'>A:</div>" + "<div class='para-content'>" + highlightValue +  "</div>" + "<div class='para-header'>Tags:</div>" + "<div class='para-content-tags'>" + tagValue + "</div><div class='para-header'>Created on:</div><div class='para-content-time'>" + timeValue;
   list.innerHTML += questionAnswerPair;
}
};



function tagSearch(){
  var search = document.getElementById('tagSearch').value;
  var tagHistory = document.getElementById("search-tags");
  console.log(0);
  for (var i = 0; i < localStorage.length; i++) {
    keyTitle = localStorage.key(i);
    var keyValue = localStorage.getItem(keyTitle);
    var obj = JSON.parse(keyValue);
    var questionValue = obj.question;
    var highlightValue = obj.highlight;
    var tagValue = obj.tags;
    var timeValue = ((obj.date).substring(0, 10));
    console.log(search);
    console.log(1);
    console.log(tagValue);
    if (tagValue === search){
    var questionAnswerPair = "<li>" + "<div class='content-container'>" + "<a href='" + keyTitle + "' target='_blank'>" + keyTitle + "</a>" + "<br><div class='para-header'>Q:</div>" + "<div class='para-content'>" + questionValue + "</div>" + "<div class='para-header'>A:</div>" + "<div class='para-content'>" + highlightValue +  "</div>" + "<div class='para-header'>Tags:</div>" + "<div class='para-content-tags'>" + tagValue + "</div><div class='para-header'>Created on:</div><div class='para-content-time'>" + timeValue;
    console.log(questionAnswerPair);
    tagHistory.innerHTML += questionAnswerPair;}
}
}




// document.addEventListener("deleteCheck", function () {
//   console.log(0);
//   var select = document.getElementById('deleteCheck');
//   console.log(select.value);
//   localStorage.removeItem(select.value);
// });
// document.getElementById('deleteCheck').addEventListener('click', console.log(0) );
// function deletEntry(){
// var select = document.getElementById('deleteCheck');
// console.log(select.value);
// localStorage.removeItem(select.value);
// }
// function deletEntry(keyTitle){
//  localStorage.removeItem(keyTitle);
// }
