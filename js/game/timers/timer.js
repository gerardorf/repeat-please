function Timer(xP = 0, yP = 0)
{
	var timer_started = null;
	var timer_stopped = null;
	var x = xP
	var y = yP;

	this.timer_started_event = function(event_name)
	{
		timer_started = document.createEvent('Event');
		timer_started.name = event_name;
		timer_started.initEvent(timer_started.name, true, true);

		return timer_started.name;
	}

	this.timer_stopped_event = function(event_name)
	{
		timer_stopped = document.createEvent('Event');
		timer_stopped.name = event_name;
		timer_stopped.initEvent(timer_stopped.name, true, true);

		return timer_stopped.name;
	}

	var loading_bar;

	var time_remaining;
	var interval;

	var repeat_event;
	
	this.start = function(time, visible)
	{
		time_remaining = time;
		interval = 400 / time;

		if(timer_started != null) document.dispatchEvent(timer_started);
		
	    repeat_event = game.time.events.repeat(Phaser.Timer.SECOND, time + 1, updateTimer, this);

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
			document.dispatchEvent(timer_stopped);
		}

		loading_bar.text.text = 'Te quedan ' + time_remaining + ' segundos.';
	}

	function reset()
	{
		game.time.events.remove(repeat_event);
		loading_bar.background.destroy();
		loading_bar.text.destroy();
		loading_bar.destroy();
	}
}