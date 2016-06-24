function Timer()
{
	var time_remaining;
	var loading_bar;
	var loading_bar_background;
	var dialog_text;
	var total_time;
	var game = null;
	var out_of_time;
	var repeat_event;
	var unidad;

	this.restart_timer = function(total, gamePar, event)
	{
		out_of_time = event;
		total_time = total;
		game = gamePar;

		if(loading_bar_background != null && loading_bar != null && dialog_text != null)
		{
			loading_bar_background.destroy();
			loading_bar.destroy();
			dialog_text.destroy();
		}

	    loading_bar = game.add.image(600, 155, 'timer_bar');
		loading_bar_background = game.add.image(600, 155, 'timer_background');

		time_remaining = total_time;
		unidad = 400 / total_time;

	    repeat_event = game.time.events.repeat(Phaser.Timer.SECOND, total_time + 1, updateTimer, this);
	    dialog_text = game.add.bitmapText(loading_bar_background.x + loading_bar_background.width + 5, loading_bar_background.y + 10, 'nokia_black', time_remaining, 20);
	}

	function updateTimer()
	{
		if(time_remaining > 0)
		{
			time_remaining -= 1;
			loading_bar.width -= unidad;
		}
		else
		{
			document.dispatchEvent(out_of_time);
		}

		dialog_text.text = time_remaining;
	}

	this.stop = function()
	{
		game.time.events.remove(repeat_event);
		loading_bar_background.destroy();
		loading_bar.destroy();
		dialog_text.destroy();
	}
}