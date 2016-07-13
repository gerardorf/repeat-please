function CountDown(visibleP = true)
{
	var visible = visibleP;
	var countdown = null;
	var timer = null;

	var sounds = null;
	var NORMAL_COUNTDOWN_TONE = 'normal_countdown_tone';
	var FINAL_COUNTDOWN_TONE = 'final_countdown_tone';

	var evt_mng = new Event_Manager();
	var done_evt = null;

	this.listen_done_event = function(listener, action)
	{
		done_evt = evt_mng.create('countdown_done_event' + listener);
		evt_mng.listen(done_evt, action);
	}

	this.start = function()
	{
		sounds = new Audio();
		sounds.set_fx(game.add.audioSprite('sound_effects'), NORMAL_COUNTDOWN_TONE);

		timer = new Timer();
		timer.listen_to_timer_stopped_event('countdown', function (e) { update(); });
		timer.start(1, false);
		
		update();
	}

	this.stop = function()
	{
		timer.stop();
		countdown.destroy();
		evt_mng.dispatch(done_evt);
		evt_mng.remove(done_evt);
	}

	function update()
	{
		if(countdown == null)
		{
			next(COUNTDOWN_3_NAME, NORMAL_COUNTDOWN_TONE);
		}
		else if(countdown.frameName == COUNTDOWN_3_NAME)
		{
			next(COUNTDOWN_2_NAME, NORMAL_COUNTDOWN_TONE);
		}
		else if(countdown.frameName == COUNTDOWN_2_NAME)
		{
			next(COUNTDOWN_1_NAME, NORMAL_COUNTDOWN_TONE);
		} 
		else if(countdown.frameName == COUNTDOWN_1_NAME) 
		{
			countdown.x = SCREEN_WIDTH / 7;
			next(COUNTDOWN_GO_NAME, FINAL_COUNTDOWN_TONE);
		}
		else if(countdown.frameName == COUNTDOWN_GO_NAME) 
		{
			countdown.destroy();
			evt_mng.dispatch(done_evt);
			evt_mng.remove(done_evt);
		}
	}

	function next(frame_name, sound_effect)
	{
		if(countdown == null) 
		{
			countdown = game.add.sprite(COUNTDOWN_ANIMATION_X, COUNTDOWN_ANIMATION_Y, TIMER_NAME, frame_name);
		}
		else
		{
			countdown.frameName = frame_name;
		}

		if(!visible && countdown.frameName == COUNTDOWN_GO_NAME)
		{
			hide(countdown);
		}
		else if((!visible && countdown.frameName != COUNTDOWN_GO_NAME) || visible)
		{
			fade_pulse_once(countdown);
		}

		play_sound(sounds, sound_effect);
		

		timer.start(1, false);
	}
}