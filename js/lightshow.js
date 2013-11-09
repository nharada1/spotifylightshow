require(['$api/audio', '$api/models'], function(audio, models) {
  var bands    = audio.BAND10;
  var numBands = bands.length;
  var analyzer = audio.RealtimeAnalyzer.forPlayer(models.player, bands);
  document.getElementById("output").innerHTML = "";
  console.log(audio.BAND10);
  analyzer.addEventListener('audio', function(evt) {
	if (evt.audio.spectrum.left[1] > 0) {
		document.getElementById("output").innerHTML="BOOM";
	}
	else {
		document.getElementById("output").innerHTML="";
	}
  });
});