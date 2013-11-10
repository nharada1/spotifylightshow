const DROP = 0;
const VERSE = 1;

var listODrops = null;
var currentState = VERSE;
  
require(['$api/audio', '$api/models'], function(audio, models) {
  var bands    = audio.BAND10;
  var numBands = bands.length;
  var analyzer = audio.BufferAnalyzer.forPlayer(models.player, bands);
  
  var socket = io.connect('http://localhost:3001'); 
  var startTime = null;
  var deltaSecs = 0;
  
  document.getElementById("boom").innerHTML = "";
  console.log(audio.BAND10);
  
  getAudioAnalysis('scary', 'skrillex');
  
  analyzer.addEventListener('audio', function(evt) {

	if (evt.audio.spectrum.left[1] > 0 && evt.audio.spectrum.right[1] > 0) {
		if (currentState == DROP) {
			socket.emit('DROP');
		} else {
			socket.emit('VERSE');
		}
		document.getElementById("boom").innerHTML="BOOM";
	}
	else {
		if (currentState == DROP) {
			stateString = "Drop";
		} else {
			stateString = "Verse";
		}
		document.getElementById("state").innerHTML=stateString;
		document.getElementById("boom").innerHTML="";
	}
	
	if (startTime) {
		var deltaSecs = (evt.deadline.getTime() - startTime.getTime()) / 1000;
		document.getElementById("deadline").innerHTML= deltaSecs;
		if (listODrops) {
			for (var i=0; i<listODrops.length; i++) {
				if (deltaSecs > listODrops[i].time) {
					console.log(listODrops[i].time);
					if (listODrops[i].type == "drop") currentState = DROP;
					if (listODrops[i].type == "verse") currentState = VERSE;
				}
			}
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

function dropList(drops){
	listODrops = drops;
	console.log(drops);
}
