function RemainingTimeBar(xP, yP)
{
	var x = xP
	var y = yP;

	var loading_bar = null;
	var loading_bar_width;
	var loading_bar_color;
	var loading_bar_background = null;
	var loading_bar_text = null;

	var interval = 0;

	var half_time_reached = false;
	var quarter_time_reached = false;

	var timer = new Timer();

	var countdown_model = new CountDown();
	var countdown_control = null;

	var sound_effects = 'sound_effects';
	var fx = null;

	var done_evt = null;

	this.listen_to_done_event = function(listener, action)
	{
		done_evt = new Event('rtb_done_event_' + listener + Math.floor((Math.random() * 100) + 1));
		done_evt.add_listener(action);
	}

	this.start = function(timeP)
	{
		timer.listen_to_tick_event('time_bar', update);
		timer.start(timeP);

		interval = game.width / timer.get_time_remaining();

		load();
	}

	function load()
	{
		load_images();
		load_sounds();
	}

	function load_images()
	{
		loading_bar_color = '#000000';
		loading_bar_width = BLACK_PLAIN_DIALOG_WIDTH;
		loading_bar = new_rectangle(BLACK_PLAIN_DIALOG_POSITION_X + 5, BLACK_PLAIN_DIALOG_POSITION_Y + 5, loading_bar_color, loading_bar_width, BLACK_PLAIN_DIALOG_HEIGHT - 10);

		loading_bar_background = new_rectangle(BLACK_PLAIN_DIALOG_POSITION_X, BLACK_PLAIN_DIALOG_POSITION_Y, '#ffffff', BLACK_PLAIN_DIALOG_WIDTH, BLACK_PLAIN_DIALOG_HEIGHT);

		loading_bar_text = game.add.bitmapText(0, BLACK_PLAIN_DIALOG_HEIGHT, NOKIA_WHITE_NAME, 'Quedan ' + timer.get_time_remaining() + ' segundos.', DEFAULT_FONT_SIZE);

		loading_bar_background.addToWorld();
		loading_bar.addToWorld();
	}

	function load_sounds()
	{
		fx = game.add.audioSprite(sound_effects);
	}

	function update()
	{
		if((timer.get_time_remaining() <= (timer.get_total_time() / 2)) && !half_time_reached)
		{
			half_time_reached = true;

			change_loading_bar_color('#fd9901');

			loading_bar_text.destroy();
			loading_bar_text = game.add.bitmapText(0, BLACK_PLAIN_DIALOG_HEIGHT, NOKIA_WHITE_NAME, 'Quedan ' + timer.get_time_remaining() + ' segundos.', DEFAULT_FONT_SIZE);
			fade_pulse(loading_bar_text, 500);
		}
		
		if((timer.get_time_remaining()  <= (timer.get_total_time() / 4)) && !quarter_time_reached)
		{
			quarter_time_reached = true;
			change_loading_bar_color('#dd0000');
		}

		if(timer.get_time_remaining() == 4)
		{
			run_countdown();
		}

		change_loading_bar_width(interval);
		loading_bar_text.text = 'Quedan ' + timer.get_time_remaining() + ' segundos.';
	}

	function change_loading_bar_width(interval)
	{
		loading_bar.destroy();
		loading_bar_width -= interval;
		loading_bar = new_rectangle(BLACK_PLAIN_DIALOG_POSITION_X + 5, BLACK_PLAIN_DIALOG_POSITION_Y + 5, loading_bar_color, loading_bar_width, BLACK_PLAIN_DIALOG_HEIGHT - 10);
		
		loading_bar.addToWorld();
	}

	function change_loading_bar_color(color)
	{
		loading_bar.destroy();
		loading_bar_color = color;
		loading_bar = new_rectangle(BLACK_PLAIN_DIALOG_POSITION_X + 5, BLACK_PLAIN_DIALOG_POSITION_Y + 5, loading_bar_color, loading_bar_width, BLACK_PLAIN_DIALOG_HEIGHT - 10);
		
		loading_bar.addToWorld();
	}

	function new_rectangle(x, y, color, width, height)
	{
		var rect = game.add.bitmapData(game.width, game.height);
	    rect.rect(x, y, width, height, color);
	    return rect;
	}

	function run_countdown()
	{
		countdown_model.listen_done_event('time_bar', reset);
		countdown_model.listen_update_event('time_bar', update_countdown_animation);
		countdown_model.start();
	}

	function update_countdown_animation()
	{
		if(countdown_control == null)
		{
			next_countdown_animation(COUNTDOWN_3_NAME, NORMAL_COUNTDOWN_TONE);
		}
		else if(countdown_control.frameName == COUNTDOWN_3_NAME)
		{
			next_countdown_animation(COUNTDOWN_2_NAME, NORMAL_COUNTDOWN_TONE);
		}
		else if(countdown_control.frameName == COUNTDOWN_2_NAME)
		{
			next_countdown_animation(COUNTDOWN_1_NAME, NORMAL_COUNTDOWN_TONE);
		} 
		else if(countdown_control.frameName == COUNTDOWN_1_NAME) 
		{
			next_countdown_animation(null, FINAL_COUNTDOWN_TONE);
		}
	}

	function next_countdown_animation(frame_name, audio_sprite)
	{
		if(countdown_control == null) 
		{
			countdown_control = game.add.sprite(COUNTDOWN_ANIMATION_X, COUNTDOWN_ANIMATION_Y, TIMER_NAME, frame_name);
		}
		else
		{
			if(frame_name != null) countdown_control.frameName = frame_name;
		}

		if(frame_name != null) fade_pulse_once(countdown_control);

		fx.play(audio_sprite);
	}

	function reset()
	{
		timer.destroy();

		countdown_model.destroy();
		
		loading_bar_background.destroy();
		loading_bar_text.destroy();
		loading_bar.destroy();

		done_evt.dispatch();
		done_evt.remove();
	}

	this.destroy = function()
	{
		timer.destroy();
		countdown_model.destroy();
		loading_bar_background.destroy();
		loading_bar_text.destroy();
		loading_bar.destroy();
		done_evt.remove();
	}
}