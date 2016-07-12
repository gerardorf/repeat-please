function Timer(xP = 0, yP = 0)
{
	var evt_mng = new Event_Manager();
	var timer_started = null;
	var timer_stopped = null;

	var x = xP
	var y = yP;

	this.listen_to_timer_started_event = function(listener, action)
	{
		timer_started = evt_mng.create('timer_started_event' + listener);
		evt_mng.listen(timer_started, action);
	}

	this.listen_to_timer_stopped_event = function(listener, action)
	{
		timer_stopped = evt_mng.create('timer_stopped_event' + listener);
		evt_mng.listen(timer_stopped, action);
	}

	var loading_bar;

	var time_remaining;
	var interval;

	var repeat_event;
	
	this.start = function(time, visible)
	{
		time_remaining = time - 1;
		interval = 400 / time_remaining;

		if(timer_started != null) evt_mng.dispatch(timer_started);
		
	    repeat_event = game.time.events.repeat(Phaser.Timer.SECOND, time, updateTimer, this);

	    draw(visible);
	}

	this.stop = function()
	{
		time_remaining = 0;
	}

	function draw(visible)
	{
		loading_bar = game.add.sprite(x, y, TIMER_NAME, TIMER_BAR_NAME);
		loading_bar.background = game.add.sprite(x, y, TIMER_NAME, TIMER_BACKGROUND_NAME);
		loading_bar.text = game.add.bitmapText(loading_bar.background.x + loading_bar.background.width + 5, loading_bar.background.y + 10, NOKIA_WHITE_NAME, 'Te quedan ' + time_remaining + ' segundos.', DEFAULT_FONT_SIZE);

		if(!visible)
		{
			hide(loading_bar);
			hide(loading_bar.background);
			hide(loading_bar.text);
		}
	}

	function updateTimer()
	{
		if(time_remaining > 0)
		{
			time_remaining -= 1;
			loading_bar.width -= interval;
		}
		else
		{
			reset();
			evt_mng.dispatch(timer_stopped);
		}

		loading_bar.text.text = 'Te quedan ' + time_remaining + ' segundos.';
	}

	function reset()
	{
		evt_mng.remove(repeat_event);
		loading_bar.background.destroy();
		loading_bar.text.destroy();
		loading_bar.destroy();
	}
}