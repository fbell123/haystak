window.onload = function(){
console.log(0);
retrieve(retrieveGoogleUrls);
console.log(2);
};


var array = [];

var retrieveGoogleUrls = function(callback){
  console.log(1);
  var links = contentDocument.getElementsByTagName("a");
  for(var i=0; i<links.length; i++) {
   array.push(links[i].href);
 }
 console.log(array);
 callback();{
   chrome.runtime.sendMessage({mesage: "array"}, array, function(response) {
     console.log(response.urlMatches);
   });
    return array;
 }
};

retrieve = function(retrieveGoogleUrls) {
};

  // var compareArrays = function(){
  //   var matches = []
  //     for(var i=0; i<values.length; i++) {
  //     matches.push(array.find(values[i]));
  //     }
  // }
  //
  // function getStorageUrls(){
  //   chrome.extension.getBackgroundPage().getUrls();
  // }
