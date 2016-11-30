
window.onload = function () {
  var list = document.getElementById('search-history');
  listHistory(list);
};

 var keyTitle;
var listHistory = function (list) {
 for (var i = 0; i < localStorage.length; i++) {
   if (localStorage.key(i) == "newest question") { continue;}
   keyTitle = localStorage.key(i);
   var keyValue = localStorage.getItem(keyTitle);
   var obj = JSON.parse(keyValue);
   var questionValue = obj.question;
   var highlightValue = obj.highlight;
   var tagValue = obj.tags;
   var timeValue = ((obj.date).substring(0, 10));
   var questionAnswerPair = "<li>" + "<div class='content-container'>" + "<a href='" + keyTitle + "' target='_blank'>" + keyTitle + "</a>" + "<br><div class='para-header'>Q:</div>" + "<div class='para-content'>" + questionValue + "</div>" + "<div class='para-header'>A:</div>" + "<div class='para-content'>" + highlightValue +  "</div>" + "<div class='para-header'>Tags:</div>" + "<div class='para-content-tags' id='tags'>" + tagValue + "</div>" + "</li><br>";
   list.innerHTML += questionAnswerPair;
}
};

(function ($) {
	  jQuery.expr[':'].Contains = function(a,i,m){
		  return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
	  };

	  function listFilter(header, list) {
		var form = $("<form>").attr({"class":"filterform","action":"#"}),
			input = $("<input>").attr({"class":"filterinput","type":"text","placeholder":"Search tags"});
		$(form).append(input).appendTo(header);

		$(input)
		  .change( function () {
			var filter = $(this).val();
			if(filter) {
			  $(list).find("div#tags:not(:Contains(" + filter + "))").parent().slideUp();
			  $(list).find("div#tags:Contains(" + filter + ")").parent().slideDown();
			} else {
			  $(list).find("li").slideDown();
			}
			return false;
		  })
		.keyup( function () {
			$(this).change();
		});
	  }

	  $(function () {
		listFilter($("#header"), $("#search-history"));
	  });
	}(jQuery));


// document.addEventListener("deleteCheck", function () {
//   console.log(0);
//   var select = document.getElementById('deleteCheck');
//   console.log(select.value);
//   localStorage.removeItem(select.value);
// });
// document.getElementById('deleteCheck').addEventListener('click', console.log(0) );
// function deletEntry(){
// var select = document.getElementById('deleteCheck');
// console.log(select.value);
// localStorage.removeItem(select.value);
// }
// function deletEntry(keyTitle){
//  localStorage.removeItem(keyTitle);
// }
