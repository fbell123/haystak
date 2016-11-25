window.onload = function(){
  retrieve();
};

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
    useMatches(response, injectNeedleIcon);
  });
}

function useMatches (response, callback) {
  var url = response.map(function(x){
    return Object.keys(x);
  });
  var value = response.map(function(x){
    return Object.values(x);
  });
  callback(url, value);
}

function injectNeedleIcon(url, value){
  console.log(url);
  console.log(value);
  url = [].concat.apply([], url);
  for(i=0; i<url.length; i++) {
    var img = document.createElement('img');
    img.src = chrome.extension.getURL('logoicon.png');
    var popup = document.createElement("a");
    popup.setAttribute("href", "#");
    popup.setAttribute("id", "trigger");
    popup.appendChild(img);
    var div = document.createElement('span');
    div.setAttribute("id", "container");
    var spacePopUp = document.createElement('div');
    spacePopUp.setAttribute("id", "pop-up");
    var valueInfo = document.createElement('p');
    console.log(JSON.parse(value[i][0]).highlight);
    valueInfo.innerHTML = "your previous question: " + JSON.parse(value[i][0]).question;
    var valueHighlight = document.createElement('p');
    valueHighlight.innerHTML = "your selected answer: " + JSON.parse(value[i][0]).highlight;
    spacePopUp.appendChild(valueInfo);
    spacePopUp.appendChild(valueHighlight);
    div.appendChild(popup);
    div.appendChild(spacePopUp);
    console.log(div);
    document.querySelector("a[href='" + url[i] + "']").appendChild(div);
  }
  hovering();
}

function hovering () {
  $('a#trigger').hover(function(e) {
    $('div#pop-up').show()
    .css('top', e.pageY)
    .css('left', e.pageX)
    .appendTo('body');
  }, function() {
    $('div#pop-up').hide();
  });
}
