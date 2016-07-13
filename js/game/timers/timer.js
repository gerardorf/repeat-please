function Timer(xP = 0, yP = 0)
{
	var evt_mng = new Event_Manager();
	var timer_started_evt = null;
	var timer_stopped_evt = null;
	var repeat_event = null;

	var total_time = 0;
	var time_remaining = 0;
	var interval = 0;

	var visible = false;
	var loading_bar = null;
	var loading_bar_width;
	var loading_bar_color;
	var loading_bar_background = null;
	var loading_bar_text = null;
	var x = xP
	var y = yP;

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

	this.start = function(timeP, visibleP)
	{
		visible = visibleP;
		total_time = timeP;

		time_remaining = total_time - 1;
		interval = 1200 / time_remaining;

		if(timer_started_evt != null) evt_mng.dispatch(timer_started_evt);
		
	    repeat_event = game.time.events.repeat(Phaser.Timer.SECOND, total_time, updateTimer, this);

	    draw();
	}

	this.stop = function()
	{
		time_remaining = 0;
	}

	function draw()
	{
		if(visible)
		{
			loading_bar_color = '#ffffff';
			loading_bar_width = BLACK_PLAIN_DIALOG_WIDTH;
			loading_bar = new_rectangle(loading_bar_color, loading_bar_width);

			loading_bar_background = new_rectangle('#000000', BLACK_PLAIN_DIALOG_WIDTH);

			loading_bar_text = game.add.bitmapText(0, BLACK_PLAIN_DIALOG_HEIGHT, NOKIA_BLACK_NAME, 'Quedan ' + time_remaining + ' segundos.', DEFAULT_FONT_SIZE);

			loading_bar_background.addToWorld();
			loading_bar.addToWorld();
		}
	}

	function new_rectangle(color, width)
	{
		var rect = game.add.bitmapData(game.width, game.height);
	    rect.rect(BLACK_PLAIN_DIALOG_POSITION_X, BLACK_PLAIN_DIALOG_POSITION_Y, width, BLACK_PLAIN_DIALOG_HEIGHT, color);

	    return rect;
	}

	function updateTimer()
	{
		launch_advices();

		if(time_remaining > 0)
		{
			time_remaining -= 1;

			if(visible) change_loading_bar_width(interval);
		}
		else
		{
			reset();
		}

		if(visible) loading_bar_text.text = 'Quedan ' + time_remaining + ' segundos.';
	}

	var half_time_reached = false;
	var quarter_time_reached = false;

	function launch_advices()
	{
		if(visible)
		{
			if((time_remaining - 1 <= (total_time / 2)) && !half_time_reached)
			{
				half_time_reached = true;

				change_loading_bar_color('#FE2E2E');
				fade_pulse_once(game.add.bitmapText(0, BLACK_PLAIN_DIALOG_HEIGHT, NOKIA_BLACK_NAME, '¡¡Te quedan ' + time_remaining + ' segundos!!', HUGE_FONT_SIZE));
			}
			
			if((time_remaining - 1  <= (total_time / 4)) && !quarter_time_reached)
			{
				quarter_time_reached = true;
				change_loading_bar_color('#dd0000');

				fade_pulse_once(game.add.bitmapText(450, 150, NOKIA_BLACK_NAME, '¡¡Solo quedan', HUGE_FONT_SIZE));
				fade_pulse_once(game.add.bitmapText(600, 250, NOKIA_BLACK_NAME, time_remaining, HUGE_FONT_SIZE + 30));
				fade_pulse_once(game.add.bitmapText(500, 350, NOKIA_BLACK_NAME, 'segundos!!', HUGE_FONT_SIZE));
			}

			if(time_remaining == 4)
			{
				run_countdown();
			}

			if(time_remaining == 1)
			{
				game.add.sprite(0, 0, 'time_over');
			}
		}
	}

	function change_loading_bar_width(interval)
	{
		loading_bar_width -= interval;

		loading_bar.destroy();

		loading_bar = new_rectangle(loading_bar_color, loading_bar_width);
		
		loading_bar.addToWorld();
	}

	function change_loading_bar_color(color)
	{
		loading_bar_color = color;

		loading_bar.destroy();

		loading_bar = new_rectangle(loading_bar_color, loading_bar_width);
		
		loading_bar.addToWorld();
	}

	function run_countdown()
	{
		var countdown = new CountDown(false);
		countdown.listen_done_event('timer_cd', function (e) { reset(); });
		countdown.start();
	}

	function reset()
	{
		evt_mng.remove(repeat_event);

		if(visible)
		{
			loading_bar_background.destroy();
			loading_bar_text.destroy();
			loading_bar.destroy();
		}

		evt_mng.dispatch(timer_stopped_evt);
		evt_mng.remove(timer_stopped_evt);
	}
}