$(document).ready(function(){
  retrieve();
});

var array = [];
var img = createElement('img');
var popup = createElement("a");
var div = createElement('span');
var spacePopUp = createElement('div');
var valueInfo = createElement('p');
var valueHighlight = createElement('p');

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

function createElement(element) {
  return document.createElement(element);
}

function imgAttribute(img) {
  img.src = chrome.extension.getURL('logoicon.png');
}

function createAllAttributes(element1, element2, element3) {
  element1.setAttribute("href", "#");
  element1.setAttribute("id", "trigger");
  element2.setAttribute("id", "container");
  element3.setAttribute("id", "pop-up");
}

function insertImg(parentDiv, img) {
  parentDiv.appendChild(img);
}

function htmlInsert(element1, element2, value) {
  element1.innerHTML = "<div class='header'><div class='home-menu pure-menu pure-menu-horizontal pure-menu-fixed'><div class='pure-menu-heading' href=''>Haysta:k</div></div></div><ul class='pure-menu-list'><br><div class='para-header'>Q:</div>" + "<div class='para-content'>" + JSON.parse(value[i][0]).question + "</div>";
  element2.innerHTML = "<div class='para-header'>A:</div>" + "<div class='para-content'>" + JSON.parse(value[i][0]).highlight + "</div>";
}

function insertIntoPopup(parentDiv, element1, element2) {
  parentDiv.appendChild(element1);
  parentDiv.appendChild(element2);
}

function insertIcon(url, iconDiv) {
  var parentDiv = document.querySelector("a[href='" + url[i] + "']").parentNode;
  var sp2 = document.querySelector("a[href='" + url[i] + "']");
  parentDiv.insertBefore(iconDiv, sp2);
}

function injectNeedleIcon(url, value){
  url = [].concat.apply([], url);
  for(i=0; i<url.length; i++) {
    imgAttribute(img);
    createAllAttributes(popup, div, spacePopUp);
    insertImg(popup, img);
    htmlInsert(valueInfo, valueHighlight, value);
    insertIntoPopup(spacePopUp, valueInfo, valueHighlight);
    insertIntoPopup(div, popup, spacePopUp);
    insertIcon(url, div);
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
