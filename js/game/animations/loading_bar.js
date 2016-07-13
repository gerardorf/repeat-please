function Top_Countdown_Bar()
{
	var loading_bar = null;
	var loading_bar_width;
	var loading_bar_color;
	var loading_bar_background = null;
	var loading_bar_text = null;
	var x = xP
	var y = yP;

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

			if(time_remaining == 3)
			{
				fade_pulse_once(game.add.bitmapText(450, 150, NOKIA_BLACK_NAME, '¡¡Solo quedan', HUGE_FONT_SIZE));
				fade_pulse_once(game.add.bitmapText(600, 250, NOKIA_BLACK_NAME, time_remaining, HUGE_FONT_SIZE + 30));
				fade_pulse_once(game.add.bitmapText(500, 350, NOKIA_BLACK_NAME, 'segundos!!', HUGE_FONT_SIZE));

				run_countdown();
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
}