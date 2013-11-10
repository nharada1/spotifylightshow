require(['$api/audio', '$api/models'], function(audio, models) {
  var bands    = audio.BAND10;
  var numBands = bands.length;
  var analyzer = audio.BufferAnalyzer.forPlayer(models.player, bands);
  
  var socket = io.connect('http://localhost:3001'); 
  var startTime = null;
  
  document.getElementById("output").innerHTML = "";
  console.log(audio.BAND10);
  analyzer.addEventListener('audio', function(evt) {

	if (evt.audio.spectrum.left[1] > 0 && evt.audio.spectrum.right[1] > 0) {
		socket.emit('TEST');
		document.getElementById("output").innerHTML="BOOM";
	}
	else {
		if (startTime) {
			var deltaSecs = (evt.deadline.getTime() - startTime.getTime()) / 1000;
			document.getElementById("output").innerHTML=deltaSecs;
		}
	}
  });
  models.player.addEventListener('change', function(evt) {
	models.player.load('playing').done(function(track) {
		if (models.player.playing) {
			startTime = new Date();
		}
	});
  });
});
