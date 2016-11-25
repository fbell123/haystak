console.log(1);

$(document).ready(function(){
  console.log(2);
  retrieve();
});

var array = [];

function retrieveGoogleUrls (callback){
  console.log('4 googlelinks');
  var links = document.getElementsByTagName("a");
  for(var i=0; i<links.length; i++) {
    array.push(links[i].href);
  }
  callback();
  console.log(array);
}

function retrieve(){
  console.log(3);
  retrieveGoogleUrls(messageBackground);
}

function messageBackground(){
  console.log('5 send message');
  chrome.runtime.sendMessage({type: "sendArray", data: array}, function(response){
    console.log(6);
    console.log(response);
    useMatches(response, injectNeedleIcon);
  });
}

function useMatches (response, callback) {
  console.log('7 use matches');
  console.log(response);
  var url = response.map(function(x){
    console.log(8);
    return Object.keys(x);
  });
  var value = response.map(function(x){
    console.log(9);
    return Object.values(x);
  });
  console.log(url);
  console.log(value);
  callback(url, value);
}

function injectNeedleIcon(url, value){
  console.log(10);
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
    valueInfo.innerHTML = "<div class='para-header'>Q:</div>" + "<div class='para-content'>" + JSON.parse(value[i][0]).question + "</div>";
    var valueHighlight = document.createElement('p');
    valueHighlight.innerHTML = "<div class='para-header'>A:</div>" + "<div class='para-content'>" + JSON.parse(value[i][0]).highlight + "</div>";
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
