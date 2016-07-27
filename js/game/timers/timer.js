function Timer()
{
	var timer_started_evt = null;
	var timer_stopped_evt = null;
	var repeat_event = null;
	var tick_evt = null;

	var total_time = 0;
	var time_remaining = 0;

	this.listen_to_timer_started_event = function(listener, action)
	{
		timer_started_evt = new Event('timer_started_event_' + listener);
		timer_started_evt.add_listener(action);
	}

	this.listen_to_timer_stopped_event = function(listener, action)
	{
		timer_stopped_evt = new Event('timer_stopped_event_' + listener);
		timer_stopped_evt.add_listener(action);
	}

	this.listen_to_tick_event = function(listener, action)
	{
		tick_evt = new Event('tick_evt_' + listener);
		tick_evt.add_listener(action);
	}

	this.start = function(time)
	{
		total_time = time;

		time_remaining = total_time - 1;

		if(timer_started_evt != null) timer_started_evt.dispatch();
		
	    repeat_event = game.time.events.repeat(Phaser.Timer.SECOND, total_time, updateTimer, this);
	}

	this.stop = function()
	{
		time_remaining = 0;
	}

	this.destroy = function()
	{
		game.time.events.remove(repeat_event);

		if(timer_started_evt != null) timer_started_evt.remove();
		if(timer_stopped_evt != null) timer_stopped_evt.remove();
		if(tick_evt != null) tick_evt.remove();	
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
		if(tick_evt != null) tick_evt.dispatch();
		
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
			timer_stopped_evt.dispatch();
		}
	}
}