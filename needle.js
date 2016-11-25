window.onload = function() {
  retrieve();
};

var array = [];

function retrieveGoogleUrls (callback){
  console.log(5);
  var links = document.getElementsByTagName("a");
  for(var i=0; i<links.length; i++) {
    array.push(links[i].href);
  }
  console.log(array);
  callback();
  console.log(3);
}


function retrieve(){
  retrieveGoogleUrls(messageBackground);
}

function messageBackground(){
  console.log(4);
  chrome.runtime.sendMessage({type: "sendArray", data: array}, function(response){
    console.log(response);
    injectNeedleIcon(response);
  });
  console.log(5);
}

function injectNeedleIcon(url){
  for(i=0; i<url.length; i++) {
    var img = document.createElement('img');
    img.src = chrome.extension.getURL('logoicon.png');
    // img.src = "https://s22.postimg.org/o1vf0n6z5/icon.png";
    var div = document.createElement('span');
    div.appendChild(img);
    document.querySelector("a[href='" + url[i] + "']").appendChild(div);
  }
}
