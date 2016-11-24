$(document).ready(function(){
  retrieve();
});

var array = [];

function retrieveGoogleUrls (callback){
  var links = document.getElementsByTagName("a");
  for(var i=0; i<links.length; i++) {
    array.push(links[i].href);
  }
  callback();
}


function retrieve(){
  retrieveGoogleUrls(messageBackground);
}

function messageBackground(){
  chrome.runtime.sendMessage({type: "sendArray", data: array}, function(response){
    injectNeedleIcon(response);
  });
}

function injectNeedleIcon(url){
  url = url.map(function(x){return Object.keys(x)})
  url = [].concat.apply([], url)
  for(i=0; i<url.length; i++) {
    var img = document.createElement('img');
    img.src = chrome.extension.getURL('logoicon.png');
    var div = document.createElement('span');
    div.appendChild(img);
    document.querySelector("a[href='" + url[i] + "']").appendChild(div);
  }
}
