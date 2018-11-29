// chrome.webNavigation.onCompleted.addListener(function() {
//      alert("I love hulu!");
//  }, {url: [{urlMatches : 'https://www.hulu.com'}]});
// use for the blacklist

 var s = document.createElement('script');
 // TODO: add "script.js" to web_accessible_resources in manifest.json
 s.src = chrome.extension.getURL('background.js');
 s.onload = function() {
     this.remove();
 };
 (document.head || document.documentElement).appendChild(s);

 chrome.webNavigation.onCompleted.addListener(function() {
   var url = window.location.href;
      alert(url);
  }, {url: [{urlMatches : 'https://www.hulu.com'}]});
