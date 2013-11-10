function init() { 
 var socket = io.connect('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
}

require(['$api/audio', '$api/models'], function(audio, models) {
  var bands    = audio.BAND10;
  var numBands = bands.length;
  var analyzer = audio.RealtimeAnalyzer.forPlayer(models.player, bands);
  document.getElementById("output").innerHTML = "";
  console.log(audio.BAND10);
  analyzer.addEventListener('audio', function(evt) {
	if (evt.audio.spectrum.left[1] > 0) {
		websocket.send("Test");
		document.getElementById("output").innerHTML="";
	}
	else {
		document.getElementById("output").innerHTML="";
	}
  });
});

window.addEventListener("load", init, false);