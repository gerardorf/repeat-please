/*
- SHOWS A SENTENCE AND READS IT.
- GIVES 3 SECONDS FOR THE USER TO READ THE SENTENCE.
- FINISHES WHEN WITHIN 3 SECONDS THE USER SPOKE AND ALL THE LOOPS REQUIRED IN CONSTRUCTOR ARE DONE.
*/

function Level1(loop_times = 0)
{
	var loop = loop_times;
	var sentence = null;

	var repeat_screen = null;

	var sentences = 'sentences';
	var sentences_fx = null;

	var sound_effects = 'sound_effects';
	var sound_effects_fx = null;

	var timer = null;
	var user_spoke = false;

	var evt_mng = new Event_Manager();
	var done_evt = evt_mng.create('level1_done');

	this.listen_to_done_event = function(action)
	{
		evt_mng.listen(done_evt, action);
	}

	this.run = function()
	{
		load_assets();
		run_animation();
		run_logic();
	}

	function load_assets()
	{
		sentence = game.add.bitmapText(	BLACKBOARD_TEXT_POSITION_X, BLACKBOARD_TEXT_POSITION_Y, 
										NOKIA_WHITE_NAME, 
										SENTENCESJSON.get().spritemap[S2_CURRENT_SENTENCE].text,
										HUGE_FONT_SIZE);
		load_audio();
	}

	function load_audio()
	{
		sentences_fx = game.add.audioSprite(sentences);
		sound_effects_fx = game.add.audioSprite(sound_effects);
	}

	function run_animation()
	{
		play_sentence();
	}

	function run_logic()
	{
		load_timer();
		restart_timer();
		RECORDER_INSTANCE.listen_to_voice_recorded_event(function (e) { user_spoke = true; });
	}

	function load_timer()
	{
		timer = new Timer();
		timer.listen_to_timer_stopped_event('level1', function (e) { time_to_speak_finished(); });
	}

	function restart_timer()
	{
		timer.start(4);
	}

	function time_to_speak_finished()
	{
		if(user_spoke) 
		{
			if(loop > 0) 
			{
				run_repeat_animation();
			}
			else
			{
				end();
			}
		}
		else
		{
			show_repeat_screen(	function (e) 
								{
									play_sentence();
									restart_timer();
								});
		}
	}

	function run_repeat_animation()
	{
		loop -= 1;

		user_spoke = false;
		
		show_repeat_screen(function (e) { console.log('pasa1'); continue_animation(); });
	}

	function continue_animation()
	{
		if(loop > 0) 
		{
			fade_pulse_once(sentence, false);
		}
		else
		{
			fade_pulse(sentence);
		}

		play_sentence();
		restart_timer();
	}

	var repeat_screen_timer = new Timer();
	function show_repeat_screen(action)
	{
		if(repeat_screen == null) repeat_screen = game.add.sprite(0, 0, 'not_match'); 
		fade_pulse_once(repeat_screen);
		sound_effects_fx.play('repeat');

		repeat_screen_timer.listen_to_timer_stopped_event('lvl1_repeat_screen' + Math.floor((Math.random() * 100) + 1) , action);
		repeat_screen_timer.start(1);
	}

	function play_sentence()
	{
		sentences_fx.play(S2_CURRENT_SENTENCE);
	}

	function end()
	{
		sentence.text = '';
		sentence = game.add.bitmapText(	BLACKBOARD_TEXT_POSITION_X, BLACKBOARD_TEXT_POSITION_Y, 
										NOKIA_WHITE_NAME, 
										SENTENCESJSON.get().spritemap[S2_CURRENT_SENTENCE].text,
										HUGE_FONT_SIZE);
		
		evt_mng.dispatch(done_evt);
		evt_mng.remove(done_evt);
	}
}