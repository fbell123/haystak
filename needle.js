//content script
console.log(-1)
$(document).ready(function(){
console.log(0);
retrieve();
console.log(2);
});


var array = ["test"];

var matchedUrl = [];

var retrieveGoogleUrls = function(callback){
  console.log(1);
  var links = document.getElementsByTagName("a");
  for(var i=0; i<links.length; i++) {
   array.push(links[i].href);
 }
 console.log(array);
 callback();
 console.log(3)
};

function retrieve(){
  retrieveGoogleUrls(messageBackground);
}


function messageBackground(){
  console.log(4)
  chrome.runtime.sendMessage({type: "sendArray", data: array}
  // ,
  //     function(response){
  //       var urls = response.urlMatches;
  //       injectNeedleIcon(urls);
  //   }
  );
  console.log(5)
}


function injectNeedleIcon(url){
  // var img = document.createElement('img');
  // img.src = 'logo.png';
  // var div = document.createElement('div');
  // div.appendChild(img);
  // for(i=0; i<url.length; i++) {
  //   document.querySelector("a[href='"url[i]"']").appendChild(div);
  // }
}
