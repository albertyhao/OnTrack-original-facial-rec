
// Big lol: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

function createUI() {
  
  alert("hi")
}

var img = document.createElement('img');
img.src = "http://albert.entredev.com?url=" + encodeURIComponent(window.location.href);
document.body.appendChild(img);

function checkIfLoaded(){
  if(!window.badSites || !window.badWords){
    return setTimeout(checkIfLoaded, 100);
  }

  window.badSites.forEach(function(badSite){
    if(location.hostname.endsWith(badSite.parent_domain)){
      location.href = "https://www.entredev.org/focus";
      return;
    }
  });
  window.badWords.forEach(function(badWord){
    var text = document.body.textContent;
    badWords.find(badWord => new RegExp(badWord).test(text));
  })
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

var happyLvl = 0;

function sendData() {
	userInteracted = true;
	/* GRABBING THE PICTURE FROM THE VIDEO */
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

	var imageDataToSend = canvas.toDataURL();
	var req = new XMLHttpRequest();
	req.open('POST', 'https://ai.experimentdrivenlife.com/capture/save/dataurl', true);
	req.setRequestHeader('content-type', 'application/json');
	req.onreadystatechange = function() {
		if (req.readyState != 4) {
			return;
		}
    processImage("https://ai.experimentdrivenlife.com/" + JSON.parse(req.response)["name"]);
    //return JSON.parse(req.response)["name"];
	}
	req.send(JSON.stringify({ image: imageDataToSend }));
}

function processImage(theImageURL) {
    // Replace <Subscription Key> with your valid subscription key.
    var subscriptionKey = "f8b349387e6249f5ae85a6adec9702aa";

    // NOTE: You must use the same region in your REST call as you used to
    // obtain your subscription keys. For example, if you obtained your
    // subscription keys from westus, replace "westcentralus" in the URL
    // below with "westus".
    //
    // Free trial subscription keys are generated in the "westus" region.
    // If you use a free trial subscription key, you shouldn't need to change
    // this region.
    var uriBase =
        "https://westus.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
            "age,gender,headPose,smile,facialHair,glasses,emotion," +
            "hair,makeup,occlusion,accessories,blur,exposure,noise"
    };

    // Display the image.

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + theImageURL + '"}',
    })

    .done(function(data) {
      if (data[0]) { // If a face was identifiable
        if (isHappy(data[0]["faceAttributes"]["emotion"])) {
          happyLvl++;
          blockByEmotion();
        }; // Console log if the face was happy or not BLA
      }


      }
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ?
            "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ?
            "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
    });
}

function isHappy(data) {
  if (data["happiness"] > 0.7) {
    return true;
  } else {
    return false;
  }
}

var video = document.createElement('video');
video.style.visibility = 'hidden';

var takenPic = document.createElement('img');

// var download = document.createElement('a');
// download.download = "image";

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

var canvas = document.createElement('canvas'); // Set the canvas up
canvas.width = 640;
canvas.height = 480;
var ctx = canvas.getContext('2d');

setInterval(sendData, 10000); // Sets an interval where every single 10000 ms (10 sec) it will call takePic

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

function blockByEmotion() {
  if (happyLvl > 3) {
    // send url to app.post to the permanent blacklist
    location.href = "https://www.entredev.org/focus";
  }
}
