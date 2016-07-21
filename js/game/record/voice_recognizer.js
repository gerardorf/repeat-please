function Voice_Recognizer()
{
	var voice_detected_for = 0;

	var evt_mng = new Event_Manager();

	var voice_recorded_evt = evt_mng.create('voice_recorded_event');

	var voice_detected_evt = evt_mng.create('voice_detected_event');
	var voice_not_detected_evt = evt_mng.create('voice_not_detected_event');

	var voice_match_evt = evt_mng.create('voice_match_event');
	var voice_not_match_evt = evt_mng.create('voice_not_match_event');

	this.listen_to_voice_recorded_event = function(action)
	{
		evt_mng.listen(voice_detected_evt, action);
	}

	this.listen_to_voice_detected_event = function(action)
	{
		evt_mng.listen(voice_detected_evt, action);
	}

	this.listen_to_voice_not_detected_event = function(action)
	{
		evt_mng.listen(voice_not_detected_evt, action);
	}

	this.listen_to_voice_match_event = function(action)
	{
		evt_mng.listen(voice_match_evt, action);
	}

	this.listen_to_voice_not_match_event = function(action)
	{

		evt_mng.listen(voice_not_match_evt, action);
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
		evt_mng.dispatch(voice_detected_evt);
	}

	function voice_not_detected()
	{
		if(voice_detected_for >= 30)
		{
			voice_detected_for = 0;
			evt_mng.dispatch(voice_recorded_evt);
			try_match();
		}

		evt_mng.dispatch(voice_not_detected_evt);
	}

	function try_match()
	{
		voice_detected_for = 0;

		if(prob())
		{
			matched = true;
			evt_mng.dispatch(voice_match_evt);
		}
		else
		{
			matched = false;
			evt_mng.dispatch(voice_not_match_evt);
		}
	}

	function prob()
	{
		var match_prob = 20;
		return Math.floor((Math.random() * 100) + 1) <= match_prob;
	}
}