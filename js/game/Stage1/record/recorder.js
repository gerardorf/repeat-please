function Recorder() 
{
	var countdown_start;
	var shared = false;
	var microphone;

	this.record = function(start)
	{
		countdown_start = start;
	   	get_micro();
	}

	this.recording = function()
	{
		return recording;
	}

	function get_micro()
	{
		if (supported())
		{
			microphone = new Microphone(new AudioContext());
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
		if(shared == false)
		{
			navigator.getUserMedia({audio:true}, 
				  					function(stream) { refresh_stream(stream); },
				  					function(e) { alert('Error capturing audio.'); });
		}
	}

	function refresh_stream(stream)
	{
		document.dispatchEvent(countdown_start);
		shared = true;
		microphone.conf
		g(stream);
	}
}
