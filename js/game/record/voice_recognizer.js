function Voice_Recognizer()
{
	var voice_detected_for = 0;

	var voice_recorded_evt = new Event('voice_recorded_event');
	var voice_detected_evt = new Event('voice_detected_event');
	var voice_not_detected_evt = new Event('voice_not_detected_event');
	var voice_match_evt = new Event('voice_match_event');
	var voice_not_match_evt = new Event('voice_not_match_event');

	this.listen_to_voice_recorded_event = function(action)
	{
		voice_recorded_evt.add_listener(action);
	}

	this.listen_to_voice_detected_event = function(action)
	{
		voice_detected_evt.add_listener(action);
	}

	this.listen_to_voice_not_detected_event = function(action)
	{
		voice_not_detected_evt.add_listener(action);
	}

	this.listen_to_voice_match_event = function(action)
	{
		voice_match_evt.add_listener(action);
	}

	this.listen_to_voice_not_match_event = function(action)
	{
		voice_not_match_evt.add_listener(action);
	}

	this.detect_voice = function(analyser)
	{
		var array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        
        var values = 0;
        var length = array.length;

        for (var i = 0; i < length; i++) 
        {
            values += array[i];
        }

        var average = values / length;

        if(average > 30)
        {
        	voice_detected();
        }
        else
        {
        	voice_not_detected();
        }
	}

	function voice_detected()
	{
		voice_detected_for += 1;
		voice_detected_evt.dispatch();
	}

	function voice_not_detected()
	{
		if(voice_detected_for >= 30)
		{
			voice_detected_for = 0;
			voice_recorded_evt.dispatch();
			try_match();
		}

		voice_not_detected_evt.dispatch();
	}

	function try_match()
	{
		voice_detected_for = 0;

		if(prob())
		{
			matched = true;
			voice_match_evt.dispatch();
		}
		else
		{
			matched = false;
			voice_not_match_evt.dispatch();
		}
	}

	function prob()
	{
		var match_prob = 1;
		return Math.floor((Math.random() * 100) + 1) <= match_prob;
	}

	this.destroy = function()
	{
		voice_recorded_evt.remove();
		voice_detected_evt.remove();
		voice_not_detected_evt.remove();
		voice_match_evt.remove();
		voice_not_match_evt.remove();
	}
}