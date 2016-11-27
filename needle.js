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
    valueInfo.innerHTML = "<div class='header'><div class='home-menu pure-menu pure-menu-horizontal pure-menu-fixed'><div class='pure-menu-heading' href=''>Haysta:k</div></div></div><ul class='pure-menu-list'><br><div class='para-header'>Q:</div>" + "<div class='para-content'>" + JSON.parse(value[i][0]).question + "</div>";
    var valueHighlight = document.createElement('p');
    valueHighlight.innerHTML = "<div class='para-header'>A:</div>" + "<div class='para-content'>" + JSON.parse(value[i][0]).highlight + "</div>";
    spacePopUp.appendChild(valueInfo);
    spacePopUp.appendChild(valueHighlight);
    div.appendChild(popup);
    div.appendChild(spacePopUp);
    var parentDiv = document.querySelector("a[href='" + url[i] + "']").parentNode;
    var sp2 = document.querySelector("a[href='" + url[i] + "']");
    parentDiv.insertBefore(div, sp2);  }
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
