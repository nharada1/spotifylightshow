require(['$api/audio', '$api/models'], function(audio, models) {
  var bands     = audio.BAND31;
  var numBands = bands.length;
  var analyzer = audio.BufferAnalyzer.forPlayer(models.player);
  document.getElementById("output").innerHTML = "";
  
  analyzer.addEventListener('audio', function(evt) {
	var text = "Data:";
	console.log(evt.deadline.getMilliseconds());
    text = evt.deadline.getHours() + ":" 
						+ evt.deadline.getMinutes() + ":" 
						+ evt.deadline.getSeconds() + "." 
						+ evt.deadline.getMilliseconds();
	document.getElementById("output").innerHTML = text;
  });
});