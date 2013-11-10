require(['$api/audio', '$api/models'], function(audio, models) {
  var bands    = audio.BAND10;
  var numBands = bands.length;
  var analyzer = audio.BufferAnalyzer.forPlayer(models.player, bands);
  var drop = 999;
  // var socket = io.connect('http://localhost:3001');
  
  document.getElementById("output").innerHTML = "";
  console.log(audio.BAND10);
  analyzer.addEventListener('audio', function(evt) {

    var timestamp = evt.deadline;
  document.getElementById("deadline").innerHTML = timestamp;
	if(evt.deadline)
  if (evt.audio.spectrum.left[1] > 0) {
		// socket.emit('TEST');
		document.getElementById("output").innerHTML="BOOM";
	}
	else {
		document.getElementById("output").innerHTML="";
	}
  });
  getDrop('scary', 'skrillex');
});


function getDrop(title, artist){
  var url = 'http://developer.echonest.com/api/v4/song/search?api_key=' +
   echo_key + '&format=json&results=1';
   if(artist !== ''){
    url += '&artist=' + artist;
    }
    url += '&title=' + title +
   '&bucket=audio_summary&callback=?';
   $.get(url, function(data) {
       // optional stuff to do after success 
       // console.log(song);
      // json_data = data;
      var track = data.response.songs[0];
      var analysis = data.response.songs[0].audio_summary;
      var danceability = analysis.danceability;
      var energy = analysis.energy;
      var liveness = analysis.liveness;
      console.log('d: ' + danceability + ' e: ' + energy);
      var analysis_url = analysis.analysis_url;
      $.getJSON(analysis_url, function(song_data){
          json_data = song_data;
          addSection(song_data);
          var meanLoudness = addSegment(song_data, 0, 0);
          var brightness = addSegment(song_data, 1, 1);
          var maxBright = sortMax(brightness);
          var dropTime = maxBright[0][0];
          dropListener(dropTime);
          console.log(drop);
       });
   });
}

function dropListener(time){
  drop = time;
}
