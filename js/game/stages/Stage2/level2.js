/*
- SHOWS THE 'REPEAT' PANEL
- ADDS THE KEYWORD TO THE BLACKBOARD
- READS THE KEYWORD
- IF NOT MATCH THEN REPEAT
- IF MATCH THEN DONE
*/

function Level2(loop_times = 0)
{
	var loop = loop_times;

	var repeat_screen = null;
	var teacher_voice = null;
	var key_word = null;

	var evt_mng = new Event_Manager();
	var done_evt = evt_mng.create('level2_done');

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
		repeat_screen = game.add.sprite(0, 0, 'not_match'); //Ask the user to repeat

		teacher_voice = new Audio();
		S1_CURRENT_SENTENCE = 'people';
		teacher_voice.set_fx(game.add.audioSprite('voice'), 'people');

		key_word = game.add.bitmapText(BLACKBOARD_TEXT_POSITION_X, BLACKBOARD_TEXT_POSITION_Y + 150, NOKIA_WHITE_NAME, teacher_voice.transcription(), HUGE_FONT_SIZE);
	}

	function run_animation()
	{
		fade_pulse_once(repeat_screen);
		play_sentence();
	}

	function run_logic()
	{
		RECORDER_INSTANCE.listen_to_voice_match_event(function (e) { match(); });
		RECORDER_INSTANCE.listen_to_voice_not_match_event(function (e) { no_match(); });
	}

	function match()
	{
		if(loop > 0) 
		{
			loop -= 1;
			run_repeat_animation();
		}
		else
		{
			end();
		}
	}

	function no_match()
	{
		run_repeat_animation();
	}

	function run_repeat_animation()
	{
		fade_pulse_once(repeat_screen);
		fade_pulse(key_word);
		play_sentence();
	}

	function play_sentence()
	{
		play_sound(teacher_voice, S1_CURRENT_SENTENCE);
	}

	function end()
	{
		LS_TEXT = '¡Hemos terminado!';
		evt_mng.dispatch(done_evt);
		evt_mng.remove(done_evt);
	}
}