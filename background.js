var storeQuestion = function (question) {
  localStorage.setItem('newest question', JSON.stringify(question));
};

var storeUrl= function (url) {
  var retrievedQuestion = JSON.parse(localStorage.getItem('newest question'));
  localStorage.setItem(retrievedQuestion,url);
  retrievedQuestion = nil;
};
