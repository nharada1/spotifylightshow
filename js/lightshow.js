function init() { 
	var PORT = 33333;
	var HOST = '127.0.0.1';

	var dgram = require('dgram');
	var message = new Buffer('My KungFu is Good!');

	var client = dgram.createSocket('udp4');
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) throw err;
		console.log('UDP message sent to ' + HOST +':'+ PORT);
		client.close();
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