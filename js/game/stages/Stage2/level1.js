/*
- SHOWS A SENTENCE AND READS IT.
- GIVES 3 SECONDS FOR THE USER TO READ THE SENTENCE.
- FINISHES WHEN WITHIN 3 SECONDS THE USER SPOKE AND ALL THE LOOPS REQUIRED IN CONSTRUCTOR ARE DONE.
*/

function Level1(loop_times = 0)
{
	var loop = loop_times;
	var sentence = null;

	var teacher_voice = null;
	var sound_effects = null;

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
		load_audio();
	}

	function load_audio()
	{
		sound_effects = new Audio();
		sound_effects.set_fx(game.add.audioSprite('sound_effects'), 'charm');

		teacher_voice = new Audio();
		teacher_voice.set_fx(game.add.audioSprite('voice'), 'things');

		sentence = game.add.bitmapText(BLACKBOARD_TEXT_POSITION_X, BLACKBOARD_TEXT_POSITION_Y, NOKIA_WHITE_NAME, teacher_voice.transcription(), HUGE_FONT_SIZE);
		S1_CURRENT_SENTENCE = 'things';
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
			play_sentence();
			restart_timer();
		}
	}

	function run_repeat_animation()
	{
		loop -= 1;

		user_spoke = false;
		repeat_screen = game.add.sprite(0, 0, 'not_match'); 
		fade_pulse_once(repeat_screen);

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

	function play_sentence()
	{
		play_sound(teacher_voice, S1_CURRENT_SENTENCE);
	}

	function end()
	{
		sentence.text = '';
		sentence = game.add.bitmapText(BLACKBOARD_TEXT_POSITION_X, BLACKBOARD_TEXT_POSITION_Y, NOKIA_WHITE_NAME, teacher_voice.transcription(), HUGE_FONT_SIZE);
		
		evt_mng.dispatch(done_evt);
		evt_mng.remove(done_evt);
	}
}