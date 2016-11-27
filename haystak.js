window.onload = function () {
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
  //  var time =(timeValue).clearTime();
  console.log((obj.date).substring(0, 10))  ;
   var questionAnswerPair = "<li>" + "<div class='content-container'>" + "<a href='" + keyTitle + "' target='_blank'>" + keyTitle + "</a>" + "<br><div class='para-header'>Q:</div>" + "<div class='para-content'>" + questionValue + "</div>" + "<div class='para-header'>A:</div>" + "<div class='para-content'>" + highlightValue +  "</div>" + "<div class='para-header'>Tags:</div>" + "<div class='para-content-tags'>" + tagValue + "</div><div class='para-header'>Created on:</div><div class='para-content-time'>" + timeValue + "</div><br><br></li><br>";
   list.innerHTML += questionAnswerPair;
}
};
function convertDate (date){

var dd = date.getDate();
var mm = date.getMonth()+1; //January is 0!
var yyyy = date.getFullYear();

if(dd<10) {
    dd='0'+dd;
}

if(mm<10) {
    mm='0'+mm;
}

return mm+'/'+dd+'/'+yyyy;
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
