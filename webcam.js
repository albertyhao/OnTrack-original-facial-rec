// Windows Azure JS

function processImage() {
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
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

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
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

    .done(function(data) {
        // Show formatted JSON on webpage.
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
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

var images;

var video = document.getElementById("videoElement"); // Sets the element with the id "videoElement" as video

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

  document.getElementById('inputImage').value = dataURI;
}

var canvas = document.createElement('canvas'); // Set the canvas up
canvas.width = 720;
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
