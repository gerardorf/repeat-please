function Last_Level()
{
	this.listen_to_done_event = function(action)
	{
		
	}

	this.run = function()
	{
		RECORDER_INSTANCE.stop_recording();
		stage_clear();
	}

	this.force_end = function()
	{
		
	}
}