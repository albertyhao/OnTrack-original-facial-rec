chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });
});

// This will run when a bookmark is created.
chrome.bookmarks.onCreated.addListener(function() {
  // do something
});

chrome.webNavigation.onCompleted.addListener(function() {
     alert("I love hulu!");
 }, {url: [{urlMatches : 'https://www.hulu.com/welcome'}]});
