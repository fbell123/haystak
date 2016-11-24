window.onload = function(){
console.log(0);
retrieve();
console.log(2);
};


var array = [];

var matchedUrl = [];

function retrieveGoogleUrls (){
  console.log(1);
  var links = document.getElementsByTagName("a");
  for(var i=0; i<links.length; i++) {
   array.push(links[i].href);
 }
 console.log(array);
 // callback();
  return array;
}

function retrieve(){
  retrieveGoogleUrls();
}

//
// function messageBackground(){
//   chrome.runtime.sendMessage({message: "sendArray", urlArray: array},
//     //   function(response){
//     //     // var urls = response.urlMatches;
//     //     injectNeedleIcon(urls);
//   //   // }
//   // );
// }


function injectNeedleIcon(url){
  var img = document.createElement('img');
  img.src = 'logo.png';
  var div = document.createElement('div');
  div.appendChild(img);
  for(i=0; i<url.length; i++) {
    document.querySelector("a[href='" +url[i] + "']").appendChild(div);
  }
}
