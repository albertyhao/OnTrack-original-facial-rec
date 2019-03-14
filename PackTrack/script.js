// Big lol: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

var onTab = true;
var num = 5000;

var img = document.createElement('img');
img.src = "http://albert.entredev.com?url=" + encodeURIComponent(window.location.href);
document.body.appendChild(img);

function checkIfLoaded(){
  //console.log(window.badWords)

  if(!window.badSites || !window.badWords){
    //console.log("timeout")
    return setTimeout(checkIfLoaded, 100);

  }

  window.badSites.forEach(function(badSite){
    if(location.hostname.endsWith(badSite.parent_domain)){
      sendMessage();

      location.href = "https://www.entredev.org/focus";
      console.log("badsite")
      return;
    }
  });
  window.badWords.forEach(function(badWord){
    var text = document.body.textContent;
    badWords.find(badWord => new RegExp(badWord).test(text));
    console.log("badWord")
  })
}
checkIfLoaded();

document.addEventListener("visibilitychange", function() {
  onTab = !document.hidden;


})

var happyLvl = 0

function sendData() {
  //console.log(num)

  if (onTab) {
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
  	var req = new XMLHttpRequest();
  	req.open('POST', uriBase + "?" + Object.keys(params).map(key => {
      return key + "=" + params[key];
    }).join("&"), true);
  	req.setRequestHeader('Content-type', 'application/json');
    req.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
  	req.onreadystatechange = function() {
  		if (req.readyState != 4) {
  			return;
  		}

      var data = JSON.parse(req.response);

      //console.log(data)

      if (data[0]) { // If a face was identifiable
        if (isHappy(data[0]["faceAttributes"]["emotion"])) {
          happyLvl++;
          blockByEmotion();
        }; // Console log if the face was happy or not BLA
      } else {
        var greyData = {};
        var darkPixels = 0;
				var pixelData = ctx.getImageData(0,0,canvas.width,canvas.height);
				//console.log(pixelData);
				for(var i = 0; i < pixelData.data.length; i+=4){
					var red = pixelData.data[i];
					var green = pixelData.data[i+1];
					var blue = pixelData.data[i+2]
					var alpha = pixelData.data[i+3]
					var grey = (red + green + blue)/3
					greyData[grey] = greyData[grey] || 0;
					greyData[grey]++;
          if(grey < 50) darkPixels++;

				}

				console.log(greyData);
        console.log(pixelData.data.length / 4 * .8);
				if(darkPixels > pixelData.data.length/4*.80) {sendMessageForCamera();}
      }
  	}
  	req.send(JSON.stringify({ url: theImageURL }));

    // .fail(function(jqXHR, textStatus, errorThrown) {
    //     // Display error message.
    //     var errorString = (errorThrown === "") ?
    //         "Error. " : errorThrown + " (" + jqXHR.status + "): ";
    //     errorString += (jqXHR.responseText === "") ?
    //         "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
    //             jQuery.parseJSON(jqXHR.responseText).message :
    //                 jQuery.parseJSON(jqXHR.responseText).error.message;
    //     alert(errorString);
    // });
}

function sendMessageForCamera() {
  console.log(true);

  var req = new XMLHttpRequest();
  req.open('POST', /*'http://ontrack1.herokuapp.com/notification'*/ 'http://localhost:8080/cam', true);
  req.setRequestHeader('content-type', 'application/json');
  req.onreadystatechange = function() {
    if (req.readyState != 4) { return; }
  }
  req.send();
}

function isHappy(data) {
  if (data["happiness"] > 0.8) {
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

setInterval(sendData, num); // Sets an interval where every single 10000 ms (10 sec) it will call takePic

var siteText = document.body.textContent;
function blockByContent() {
  window.badWords.forEach(function(badWord){
    var pattern = new RegExp(badWord, 'ig');
    if(pattern.test(siteText)) {
      location.href = "https://www.entredev.org/focus";
      return;
    }
  });
}

function sendMessage() {
  var req = new XMLHttpRequest();
  req.open('POST', /*'http://ontrack1.herokuapp.com/notification'*/ 'http://localhost:8080/notification', true);
  req.setRequestHeader('content-type', 'application/json');
  req.onreadystatechange = function() {
    if (req.readyState != 4) { return; }
    location.href = "https://www.entredev.org/focus";
  }
  req.send();
}

function blockByEmotion() {
  if (happyLvl > 0) {
    sendMessage();
  }
}

function resetHappyLvl() {
  happyLvl = 0;
}

function blockByBlacklist() {

}

setInterval(resetHappyLvl, 3600000)
