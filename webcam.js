var video = document.getElementById("videoElement");
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia ||
                         navigator.oGetUserMedia;

if (navigator.getUserMedia) {
  navigator.getUserMedia({video: true}, handleVideo, videoError);
}

function handleVideo(stream) {
  video.srcObject = stream;
  video.onloadedmetadata = function(e) {
    video.play();
  }
}

function videoError(e) {
  console.log(e);
}

var canvas = document.createElement('canvas');
canvas.width = 640;
canvas.height = 480;
var ctx = canvas.getContext('2d');

var takePic = document.getElementById("takePic");

takePic.addEventListener('click', function() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  var dataURI = canvas.toDataURL('image/jpeg');
  
  document.getElementById("takenPic").src = dataURI;
})
