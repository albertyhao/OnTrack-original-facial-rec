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

var canvas = document.createElement('canvas'); // Set the canvas up
canvas.width = 640;
canvas.height = 480;
var ctx = canvas.getContext('2d');

function takePic() { // Function to take a picture
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Draw the current video frame onto the canvas

  var dataURI = canvas.toDataURL('image/jpeg'); // Translate the picture on the canvas into a link

  document.getElementById("takenPic").src = dataURI; // An image element with the id of "takenPic" will display the image

  // TODO: Save the images somewhere
  console.log(dataURI)
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

var pic = document.getElementById("takePic");

pic.addEventListener('click', takePic());

setInterval(takePic, 10000); // Sets an interval where every single 10000 ms (10 sec) it will call takePic
