// var enabled = false;
//
// chrome.browserAction.onClicked.addListener(function(){
//   enabled = !enabled;
//
//   chrome.browserAction.setBadgeText({
//     text: enabled? "ON" : ""
//   });
// });
//


var array = [];
chrome.runtime.onMessage.addListener(function (question) {
  console.log(array);
  if (array.length < 2) {
    array.push(question);
  }
  else
  storeQuestion(array[0]);
  storeUrl(arra[1]);

  // if (request == "saveQuestion") {
    console.log("hello3");
  //   // storeQuestion(question);
  // }
  // else if (request == "saveUrl") {
  //   var url = question;
  //   storeUrl(url);
  // }
});


var search;

var storeQuestion = function (question) {
  console.log("hello4");
localStorage.setItem('question', JSON.stringify(question));
};

var storeUrl= function (url) {
  var retrievedQuestion = JSON.parse(localStorage.getItem('question'));
localStorage.setItem(retrievedQuestion, JSON.stringify(url));
};
// var testObject = { 'one': 1, 'two': 2, 'three': 3 };
// localStorage.setItem('testObject', JSON.stringify(testObject));
// var retrievedObject = JSON.parse(localStorage.getItem('testObject'));
