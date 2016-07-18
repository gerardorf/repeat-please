function Timer()
{
	var evt_mng = new Event_Manager();
	var timer_started_evt = null;
	var timer_stopped_evt = null;
	var repeat_event = null;
	var tick_evt = null;

	var total_time = 0;
	var time_remaining = 0;

	this.listen_to_timer_started_event = function(listener, action)
	{
		timer_started_evt = evt_mng.create('timer_started_event_' + listener);
		evt_mng.listen(timer_started_evt, action);
	}

	this.listen_to_timer_stopped_event = function(listener, action)
	{
		timer_stopped_evt = evt_mng.create('timer_stopped_event_' + listener);
		evt_mng.listen(timer_stopped_evt, action);
	}

	this.listen_to_tick_event = function(listener, action)
	{
		tick_evt = evt_mng.create('tick_evt_' + listener);
		evt_mng.listen(tick_evt, action);
	}

	this.start = function(time)
	{
		total_time = time;

		time_remaining = total_time - 1;

		if(timer_started_evt != null) evt_mng.dispatch(timer_started_evt);
		
	    repeat_event = game.time.events.repeat(Phaser.Timer.SECOND, total_time, updateTimer, this);
	}

	this.stop = function()
	{
		time_remaining = 0;
	}

	this.get_total_time = function()
	{
		return total_time;
	}

	this.get_time_remaining = function()
	{
		return time_remaining;
	}

	function updateTimer()
	{
		if(tick_evt != null) evt_mng.dispatch(tick_evt);
		
		if(time_remaining > 0)
		{
			time_remaining -= 1;
		}
		else
		{
			reset();
		}
	}

	function reset()
	{
		game.time.events.remove(repeat_event);
		
		if(timer_stopped_evt != null) 
		{
			evt_mng.dispatch(timer_stopped_evt);
			evt_mng.remove(timer_stopped_evt);
		}
	}
}