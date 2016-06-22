function start_recording()
{
	if (supported())
	{
		get_user_media();
	}
	else
	{
		alert('getUserMedia not supported in this browser.'); 
	}
}

function supported()
{
	if (!navigator.getUserMedia)
	{
		navigator.getUserMedia =  navigator.getUserMedia 
		                          || navigator.webkitGetUserMedia 
		                          || navigator.mozGetUserMedia 
		                          || navigator.msGetUserMedia;
	}

	return navigator.getUserMedia;
}

function get_user_media()
{
	navigator.getUserMedia(
		  {audio:true}, 
		  function(stream) { start_microphone(stream); },
		  function(e) { alert('Error capturing audio.'); }
		);
}

function start_microphone(stream)
{
	var microphone = new Microphone(new AudioContext(), stream);;
	microphone.config(stream);
}