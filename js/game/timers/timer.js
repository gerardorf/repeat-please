function Timer(gamePar)
{
	var game = gamePar;

	var timer_started = document.createEvent('Event');
	timer_started.name = 'timer_started';
	timer_started.initEvent(timer_started.name, true, true);

	var timer_stopped = document.createEvent('Event');
	timer_stopped.name = 'timer_stopped';
	timer_stopped.initEvent(timer_stopped.name, true, true);

	this.timer_started_event = function()
	{
		return timer_started.name;
	}

	this.timer_stopped_event = function()
	{
		return timer_stopped.name;
	}

	var loading_bar;

	var time_remaining;
	var interval;

	var repeat_event;
	

	this.start_timer = function(time)
	{
		time_remaining = time;
		interval = 400 / time;

		document.dispatchEvent(timer_started);
	    repeat_event = game.time.events.repeat(Phaser.Timer.SECOND, time + 1, updateTimer, this);

	    loading_bar = game.add.sprite(S1_TIMER_POSITION_X, S1_TIMER_POSITION_Y, TIMER_NAME, TIMER_BAR_NAME);
		loading_bar.background = game.add.sprite(S1_TIMER_POSITION_X, S1_TIMER_POSITION_Y, TIMER_NAME, TIMER_BACKGROUND_NAME);
		loading_bar.text = game.add.bitmapText(loading_bar.background.x + loading_bar.background.width + 5, loading_bar.background.y + 10, DEFAULT_DIALOG_FONT, time_remaining, DEFAULT_FONT_SIZE);
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