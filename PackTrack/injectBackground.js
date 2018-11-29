chrome.webNavigation.onCompleted.addListener(function() {
  var s = document.createElement('script');
  // TODO: add "script.js" to web_accessible_resources in manifest.json
  s.src = chrome.extension.getURL('background.js');
  s.onload = function() {
      this.remove();
  };
  (document.head || document.documentElement).appendChild(s);

 }, {url: [{urlMatches : 'https://www.hulu.com'}]});
