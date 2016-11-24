$(document).ready(function(){
console.log(0);
injectNeedleIcon();
console.log(2);
});


var array = ["test"];

var matchedUrl = [];

function retrieveGoogleUrls (){
  console.log(5);
  var links = document.getElementsByTagName("a");
  for(var i=0; i<links.length; i++) {
   array.push(links[i].href);
 }
 console.log(array);
 callback();
 console.log(3);
};
 // callback();
  return array;
}

function retrieve(){
  retrieveGoogleUrls();
}

function messageBackground(){
  console.log(4);
  chrome.runtime.sendMessage({type: "sendArray", data: array}, function(response){
      console.log(response);
      injectNeedleIcon(response);
    });
  console.log(5);
}

function injectNeedleIcon(){
  url = ["https://en.wikipedia.org/wiki/Pepper", "https://www.peppergroup.co.uk/about-us/contact-us", "http://www.peppercorp.com/"];
  for(i=0; i<url.length; i++) {
  var img = document.createElement('img');
  img.src = chrome.extension.getURL('logoicon.png');
  // img.src = "https://s22.postimg.org/o1vf0n6z5/icon.png";
  console.log(img.src);
  console.log(1);
  var div = document.createElement('span');
  div.appendChild(img);
<<<<<<< HEAD
  console.log(div);
  console.log(3);
    document.querySelector("a[href='" + url[i] + "']").appendChild(div);
    console.log(4);
}
=======
  for(i=0; i<url.length; i++) {
    document.querySelector("a[href='"+url[i]+"']").appendChild(div);

  }
>>>>>>> 28a1805c6979fe92706e9c775d88b49972a9514a
}
