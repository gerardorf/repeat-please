/*
- SHOWS A SENTENCE AND READS IT.
- GIVES 3 SECONDS FOR THE USER TO READ THE SENTENCE.
- FINISHES WHEN WITHIN 3 SECONDS THE USER SPOKE AND ALL THE LOOPS REQUIRED IN CONSTRUCTOR ARE DONE.
*/

function Level1(loop_times = 0)
{
	var TIME_UNTIL_REPEAT_SCREEN = 5;
	var TIME_TO_SHOW_STATEMENT = 3;

	var loop = loop_times;

	var sentence = null;
	var statement = null;
	var statement_bubble = null;

	var repeat_screen = null;

	var sentences_fx = null;
	var sound_effects_fx = null;

	var detect_voice_timer = new Timer();
	var repeat_screen_timer = new Timer();
	var show_statement_timer = new Timer();
	var user_spoke = false;

	var done_evt = new Event('level1_done');

	this.listen_to_done_event = function(action)
	{
		done_evt.add_listener(action);
	}

	this.run = function()
	{
		load_assets();
		run_animation();
		run_logic();
	}

	function load_assets()
	{
		load_audio();
	}

	function load_audio()
	{
		sentences_fx = game.add.audioSprite(S2_SENTENCES);
		sound_effects_fx = game.add.audioSprite(S2_SOUND_EFFECTS);
	}

	function run_animation()
	{
		show_statement();
		show_sentence();
	}

	function show_statement()
	{
		statement_bubble = game.add.sprite(BLACKBOARD_TEXT_POSITION_X - 150, BLACKBOARD_TEXT_POSITION_Y - 20, DIALOG_NAME, STATEMENT_DIALOG_NAME);

		statement = game.add.bitmapText(BLACKBOARD_TEXT_POSITION_X - 50, BLACKBOARD_TEXT_POSITION_Y + 20, 
										NOKIA_BLACK_NAME, 
										'Repite en voz alta la siguiente frase:',
										DEFAULT_FONT_SIZE);

		show_statement_timer.listen_to_timer_stopped_event('lvl1_show_statement', hide_statement);
		show_statement_timer.start(TIME_TO_SHOW_STATEMENT);
	}

	function hide_statement()
	{
		fade_out(statement_bubble);
		fade_out(statement);

		drag(sentence, { y: BLACKBOARD_TEXT_POSITION_Y });
	}

	function show_sentence()
	{
		sentence = game.add.bitmapText(	BLACKBOARD_TEXT_POSITION_X, BLACKBOARD_TEXT_POSITION_Y + 100, 
										NOKIA_WHITE_NAME, 
										SENTENCESJSON.get().spritemap[S2_CURRENT_SENTENCE].text,
										HUGE_FONT_SIZE);

		play_sentence();
	}

	function run_logic()
	{
		load_timer();
		restart_timer();
		RECORDER_INSTANCE.listen_to_voice_recorded_event(change_user_spoke_state);
	}

	function change_user_spoke_state()
	{
		user_spoke = true;
	}

	function load_timer()
	{
		detect_voice_timer.listen_to_timer_stopped_event('lvl1_detect_voice', time_to_speak_finished);
	}

	function restart_timer()
	{
		detect_voice_timer.start(TIME_UNTIL_REPEAT_SCREEN);
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
			show_repeat_screen(restart_animation);
		}
	}

	function restart_animation()
	{
		play_sentence();
		restart_timer();
	}

	function run_repeat_animation()
	{
		loop -= 1;

		user_spoke = false;
		
		show_repeat_screen(continue_animation);
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

		detect_voice_timer.destroy();
		repeat_screen_timer.destroy();
		show_statement_timer.destroy();
		
		done_evt.dispatch();
		done_evt.remove();
	}

	this.force_end = function()
	{
		detect_voice_timer.destroy();
		repeat_screen_timer.destroy();
		show_statement_timer.destroy();

		done_evt.remove();
	}
}