function start_recording()
{
  if (!navigator.getUserMedia)
  {
    navigator.getUserMedia =  navigator.getUserMedia 
                              || navigator.webkitGetUserMedia 
                              || navigator.mozGetUserMedia 
                              || navigator.msGetUserMedia;
  }

  if (navigator.getUserMedia)
  {
    navigator.getUserMedia(
      {audio:true}, 
      function(stream) { start_microphone(stream); },
      function(e) { alert('Error capturing audio.'); }
    );
  } 
  else
  {
    alert('getUserMedia not supported in this browser.'); 
  }
}

function start_microphone(stream)
{
  var microfono = new Micro(new AudioContext(), stream);
  microfono.config(stream);
}