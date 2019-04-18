// Big lol: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

var ctmnts = 0;
var ctsecs = 0;
var timeout;

var onTab = true;
var blacklist;
var num = 7500;
var badWords = [
  "Game",
  "Movie",
  "Pics",
  "Anime",
  "Fandom",
  "Shopping",
  "TV",
  "Fan",
  "Fiction",
  "Comic",
  "Manga",
  "Porn",
  "XXX",
  "XX",
  "Meme",
  "Film",
  "Fanatic",
  "pimp",
  "sexy",
  "lust",
  "slut",
  "ass",
  "tit",
  "orgasm",
  "mast",
  "bang",
  "kink",
  "horny",
  "spank",
  "fuck",
  "jizz",
  "whore",
  "ahole",
  "anus",
  "ash0le",
  "ash0les",
  "asholes",
  "ass",
  "Ass Monkey",
  "Assface",
  "assh0le",
  "assh0lez",
  "asshole",
  "assholes",
  "assholz",
  "asswipe",
  "azzhole",
  "bassterds",
  "bastard",
  "bastards",
  "bastardz",
  "basterds",
  "basterdz",
  "Biatch",
  "bitch",
  "bitches",
  "Blow Job",
  "boffing",
  "butthole",
  "buttwipe",
  "c0ck",
  "c0cks",
  "c0k",
  "Carpet Muncher",
  "cawk",
  "cawks",
  "Clit",
  "cnts",
  "cntz",
  "cock",
  "cockhead",
  "cock-head",
  "cocks",
  "CockSucker",
  "cock-sucker",
  "cum",
  "cunt",
  "cunts",
  "cuntz",
  "dick",
  "dild0",
  "dild0s",
  "dildo",
  "dildos",
  "dilld0",
  "dilld0s",
  "dominatricks",
  "dominatrics",
  "dominatrix",
  "dyke",
  "f u c k",
  "f u c k e r",
  "fag",
  "fag1t",
  "faget",
  "fagg1t",
  "faggit",
  "faggot",
  "fagg0t",
  "fagit",
  "fags",
  "fagz",
  "faig",
  "faigs",
  "fart",
  "flipping the bird",
  "fuck",
  "fucker",
  "fuckin",
  "fucking",
  "fucks",
  "Fudge Packer",
  "fuk",
  "Fukah",
  "Fuken",
  "fuker",
  "Fukin",
  "Fukk",
  "Fukkah",
  "Fukken",
  "Fukker",
  "Fukkin",
  "g00k",
  "gayboy",
  "gaygirl",
  "gays",
  "gayz",
  "God-damned",
  "h00r",
  "h0ar",
  "h0re",
  "hells",
  "hoor",
  "hoore",
  "jackoff",
  "jap",
  "japs",
  "jerk-off",
  "jisim",
  "jiss",
  "jizm",
  "jizz",
  "knobz",
  "kunt",
  "kunts",
  "kuntz",
  "Lezzian",
  "Lipshits",
  "Lipshitz",
  "masokist",
  "massterbait",
  "masstrbait",
  "masstrbate",
  "masterbaiter",
  "masterbate",
  "masterbates",
  "Motha Fucker",
  "Motha Fuker",
  "Motha Fukkah",
  "Motha Fukker",
  "Mother Fucker",
  "Mother Fukah",
  "Mother Fuker",
  "Mother Fukkah",
  "Mother Fukker",
  "mother-fucker",
  "Mutha Fucker",
  "Mutha Fukah",
  "Mutha Fuker",
  "Mutha Fukkah",
  "Mutha Fukker",
  "n1gr",
  "nastt",
  "nigger;",
  "nigur;",
  "niiger;",
  "niigr;",
  "orafis",
  "orgasim;",
  "orgasm",
  "orgasum",
  "orifice",
  "orifiss",
  "packi",
  "packie",
  "packy",
  "paki",
  "pakie",
  "paky",
  "pecker",
  "peeenus",
  "peeenusss",
  "peenus",
  "peinus",
  "pen1s",
  "penas",
  "penis-breath",
  "penus",
  "penuus",
  "Phuc",
  "Phuck",
  "Phuk",
  "Phuker",
  "Phukker",
  "polac",
  "polack",
  "polak",
  "Poonani",
  "pr1c",
  "pr1ck",
  "pr1k",
  "pusse",
  "pussee",
  "pussy",
  "puuke",
  "puuker",
  "queerz",
  "qweers",
  "qweerz",
  "qweir",
  "recktum",
  "retard",
  "scank",
  "schlong",
  "sexy",
  "Sh!t",
  "sh1t",
  "sh1ter",
  "sh1ts",
  "sh1tter",
  "sh1tz",
  "shit",
  "shits",
  "shitter",
  "Shitty",
  "Shity",
  "shitz",
  "Shyt",
  "Shyte",
  "Shytty",
  "Shyty",
  "skanck",
  "skank",
  "skankee",
  "skankey",
  "skanks",
  "Skanky",
  "slag",
  "slut",
  "sluts",
  "Slutty",
  "slutz",
  "son-of-a-bitch",
  "tit",
  "turd",
  "va1jina",
  "vag1na",
  "vagiina",
  "vaj1na",
  "vajina",
  "vullva",
  "w0p",
  "wh00r",
  "wh0re",
  "whore",
  "xrated",
  "xxx",
  "b!+ch",
  "bitch",
  "blowjob",
  "clit",
  "arschloch",
  "fuck",
  "shit",
  "ass",
  "asshole",
  "b!tch",
  "b17ch",
  "b1tch",
  "bastard",
  "bi+ch",
  "boiolas",
  "buceta",
  "c0ck",
  "cawk",
  "chink",
  "cipa",
  "clits",
  "cock",
  "cum",
  "cunt",
  "dildo",
  "dirsa",
  "ejakulate",
  "fatass",
  "fcuk",
  "fuk",
  "fux0r",
  "hoer",
  "hore",
  "jism",
  "kawk",
  "l3itch",
  "l3i+ch",
  "lesbian",
  "masturbate",
  "masterbat*",
  "masterbat3",
  "motherfucker",
  "s.o.b.",
  "mofo",
  "nigga",
  "nigger",
  "nutsack",
  "phuck",
  "pimpis",
  "pusse",
  "pussy",
  "sh!t",
  "shemale",
  "shi+",
  "sh!+",
  "slut",
  "smut",
  "teets",
  "tits",
  "boobs",
  "b00bs",
  "teez",
  "testical",
  "titt",
  "w00se",
  "jackoff",
  "wank",
  "whoar",
  "whore",
  "*damn",
  "*dyke",
  "*fuck*",
  "*shit*",
  "@$$",
  "amcik",
  "andskota",
  "arse*",
  "assrammer",
  "ayir",
  "bi7ch",
  "bitch*",
  "bollock*",
  "butt-pirate",
  "cabron",
  "cazzo",
  "chraa",
  "chuj",
  "Cock*",
  "cunt*",
  "d4mn",
  "daygo",
  "dego",
  "dick*",
  "dike*",
  "dupa",
  "dziwka",
  "ejackulate",
  "Ekrem*",
  "Ekto",
  "enculer",
  "faen",
  "fag*",
  "fanculo",
  "fanny",
  "feg",
  "Felcher",
  "ficken",
  "fitt*",
  "Flikker",
  "foreskin",
  "Fotze",
  "Fu(*",
  "fuk*",
  "futkretzn",
  "gook",
  "guiena",
  "h0r",
  "h4x0r",
  "helvete",
  "hoer*",
  "honkey",
  "Huevon",
  "hui",
  "injun",
  "jizz",
  "kanker*",
  "kike",
  "klootzak",
  "kraut",
  "knulle",
  "kuk",
  "kuksuger",
  "Kurac",
  "kurwa",
  "kusi*",
  "kyrpa*",
  "lesbo",
  "mamhoon",
  "masturbat*",
  "merd*",
  "mibun",
  "monkleigh",
  "mouliewop",
  "muie",
  "mulkku",
  "muschi",
  "nepesaurio",
  "nigger*",
  "orospu",
  "paska*",
  "perse",
  "picka",
  "pierdol*",
  "pillu*",
  "pimmel",
  "piss*",
  "pizda",
  "poontsee",
  "porn",
  "p0rn",
  "pr0n",
  "pula",
  "pule",
  "puta",
  "puto",
  "qahbeh",
  "queef*",
  "rautenberg",
  "schaffer",
  "scheiss*",
  "schlampe",
  "sh!t*",
  "sharmuta",
  "sharmute",
  "shipal",
  "shiz",
  "skribz",
  "skurwysyn",
  "sphencter",
  "spic",
  "spierdalaj",
  "splooge",
  "suka",
  "b00b*",
  "testicle*",
  "titt*",
  "twat",
  "vittu",
  "wank*",
  "wetback*",
  "wichser",
  "wop*",
  "yed",
  "zabourah"
]

var img = document.createElement('img');
img.src = "http://albert.entredev.com?url=" + encodeURIComponent(window.location.href);
document.body.appendChild(img);

function checkIfLoaded(){
  if(!blacklist){
    return;
  }

  blacklist.forEach(function(badSite){
    if(location.hostname.endsWith(badSite.domain)){
      location.href = "https://www.entredev.org/focus";
      return;
    }
  });
  window.badWords.forEach(function(badWord){
    var text = document.body.textContent;
    var words = text.toLowerCase().split(' ');
    var bad = words.find(w => badWords.includes(w));
    if(bad) location.href = "https://www.entredev.org/focus";
  })
}

document.addEventListener("visibilitychange", function() {
  onTab = !document.hidden;

  if (onTab) {startTimer()}
  if (!onTab) {stopTimer()}
})

var happyLvl = 0;

function sendData() {
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
    var subscriptionKey = "5de4bab726d5444b9f1d7c9505c41769";

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
        "returnFaceAttributes": "emotion"
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

      console.log(data);

      if (data[0]) { // If a face was identifiable
        if (isHappy(data[0]["faceAttributes"]["emotion"])) {
          happyLvl++;
          blockByEmotion();
        }; // Console log if the face was happy or not BLA
      } else {
        var greyData = {};
        var darkPixels = 0;
				var pixelData = ctx.getImageData(0,0,canvas.width,canvas.height);
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
  req.open('POST', 'https://ontrack1.herokuapp.com/cam', true);
  req.setRequestHeader('content-type', 'application/json');
  req.onreadystatechange = function() {
    if (req.readyState != 4) { return; }
  }
  req.send();
}

function isHappy(data) {
  if (data["happiness"] > 0.5) {
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

//setInterval(sendData, 1000); // Sets an interval where every single 10000 ms (10 sec) it will call takePic

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
  req.open('POST', 'https://ontrack1.herokuapp.com/notification', true);
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

// TIMER FUNCTIONS ----------------------------------------------------------
function stopwatch() {
  ctsecs++;

  console.log(ctsecs);

  timeout = setTimeout('stopwatch()', 1000);
}

function startTimer() {
  stopwatch();
}

function stopTimer() {
  //if (ctsecs > 60) {
    var date = new Date();
    sendTimesToDB(ctsecs, location.href, date.getTime());
    ctsecs = 0;
  //}
  clearTimeout(timeout);
}

function sendTimesToDB(secs, website, timeStamp) {
  var package = {
    secs: secs,
    //user: true,
    date: timeStamp,
    website: website
  };

  var req = new XMLHttpRequest();
  req.open('POST', 'https://ontrack1.herokuapp.com/timespent', true);
  req.setRequestHeader('content-type', 'application/json');
  req.onreadystatechange = function() {
    if (req.readyState != 4) { return; }
  }
  req.send(JSON.stringify(package));
}

startTimer();
/////////////////////////////////////////////////////////////////////////

function loadFromDB(){
  var req = new XMLHttpRequest();
  req.open('GET', 'https://ontrack1.herokuapp.com/allblacklist', true);
  req.setRequestHeader('content-type', 'application/json');
  req.onreadystatechange = function(){
    if(req.readyState != 4){
      return;
    }
    blacklist = JSON.parse(req.response);
    checkIfLoaded();
  }
  req.send();
}
loadFromDB();

setInterval(sendData, num);

setInterval(resetHappyLvl, 3600000)
