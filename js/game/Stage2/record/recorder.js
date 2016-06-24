function Recorder() 
{
	var timeout;
	var out_of_time_event;
	
	this.record_for = function(time, event)
	{
		out_of_time_event = event;
		timeout = time;
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

	function start_microphone(stream, event)
	{
		var microphone = new Microphone(new AudioContext(), stream);
		microphone.config(stream);

		var i = 0;

		var timer = setTimeout(	function() 
								{
									timer = setTimeout(arguments.callee, 0);

									if (i ++== timeout) 
									{
									    clearTimeout(timer);
									    microphone.stop();
									    document.dispatchEvent(out_of_time_event);						    
									}
								},
								0)
	}
}
