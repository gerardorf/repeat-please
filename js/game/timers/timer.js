function Timer()
{
	var timer_started = null;
	var timer_stopped = null;

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
	
	this.start_timer = function(time, visible, x, y)
	{
		time_remaining = time;
		interval = 400 / time;

		if(timer_started != null) document.dispatchEvent(timer_started);
		
	    repeat_event = game.time.events.repeat(Phaser.Timer.SECOND, time + 1, updateTimer, this);

	    draw(visible);
	}

	function draw(visible, x = 0, y = 0)
	{
		loading_bar = game.add.sprite(x, y, TIMER_NAME, TIMER_BAR_NAME);
		loading_bar.background = game.add.sprite(x, y, TIMER_NAME, TIMER_BACKGROUND_NAME);
		loading_bar.text = game.add.bitmapText(loading_bar.background.x + loading_bar.background.width + 5, loading_bar.background.y + 10, DEFAULT_DIALOG_FONT, time_remaining, DEFAULT_FONT_SIZE);

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

		loading_bar.text.text = time_remaining;
	}

	function reset()
	{
		game.time.events.remove(repeat_event);
		loading_bar.background.destroy();
		loading_bar.text.destroy();
		loading_bar.destroy();
	}
}