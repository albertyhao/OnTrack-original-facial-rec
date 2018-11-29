// chrome.webNavigation.onCompleted.addListener(function() {
//      alert("I love hulu!");
//  }, {url: [{urlMatches : 'https://www.hulu.com'}]});
// use for the blacklist

 chrome.webNavigation.onCompleted.addListener(function() {
   var url = window.location.href;
      alert(url);
  }, {url: [{urlMatches : 'https://www.hulu.com'}]});
