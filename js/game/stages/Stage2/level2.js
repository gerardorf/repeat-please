/*
- SHOWS THE 'REPEAT' PANEL
- ADDS THE KEYWORD TO THE BLACKBOARD
- READS THE KEYWORD
- IF NOT MATCH THEN REPEAT
- IF NOT MATCH FOR times_not_matched TIMES, SHOWS HINT
- IF MATCH THEN DONE
*/

function Level2(teacherP, loop_times = 0)
{
	var teacher = teacherP;
	var loop = loop_times;

	var repeat_screen = null;

	var keywords_fx = null;
	var sound_effects_fx = null;

	var keyword = null;
	var keyword_id;
	var keyword_text;
	var hint = null;
	var hint_id;
	var times_not_matched = 0;

	var done_evt = new Event('level2_done');

	var repeat_screen_timer = new Timer();

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
		keywords_fx = game.add.audioSprite(S2_KEYWORDS);
		sound_effects_fx = game.add.audioSprite(S2_SOUND_EFFECTS);

		keyword_id = SENTENCESJSON.get().spritemap[S2_CURRENT_SENTENCE].keyword;
		keyword = KEYWORDSJSON.get().spritemap[keyword_id];
		
		keyword_text = game.add.bitmapText(	BLACKBOARD_TEXT_POSITION_X, BLACKBOARD_TEXT_POSITION_Y + 150,
											NOKIA_WHITE_NAME, 
											keyword.text, 
											HUGE_FONT_SIZE);
	}

	function run_animation()
	{
		show_repeat_screen(play_keyword);
	}

	function run_logic()
	{
		RECORDER_INSTANCE.listen_to_voice_match_event(match);
		RECORDER_INSTANCE.listen_to_voice_not_match_event(no_match);
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
		if(max_times_failed())
		{
			show_hint();
		}
		else
		{
			run_repeat_animation();
		}
	}

	function max_times_failed()
	{
		var result = false;

		times_not_matched += 1;

		if(times_not_matched == 3)
		{
			result = true;
			times_not_matched = 0;
		}

		return result;
	}

	function show_hint()
	{
		teacher.frameName = TEACHER_HINT;
		load_dialog();
		play_hint();
	}

	
	function load_dialog()
	{
		game.add.sprite(BLACKBOARD_TEXT_POSITION_X - 50, BLACKBOARD_TEXT_POSITION_Y + 230, DIALOG_NAME, HINT_DIALOG_NAME);

		hint_id = keyword.hint;
		hint = KEYWORDSJSON.get().spritemap[hint_id];
		game.add.bitmapText(	BLACKBOARD_TEXT_POSITION_X + 50, BLACKBOARD_TEXT_POSITION_Y + 270, 
								DEFAULT_DIALOG_FONT, 
								hint.text, 
								DEFAULT_FONT_SIZE);
	}

	function run_repeat_animation()
	{
		show_repeat_screen(restart_animation);
	}

	function restart_animation()
	{
		fade_pulse(keyword_text);
		play_keyword();
	}

	function play_keyword()
	{
		keywords_fx.play(keyword_id);
	}

	function play_hint()
	{
		keywords_fx.play(hint_id);
	}

	function show_repeat_screen(action)
	{
		if(repeat_screen == null) repeat_screen = game.add.sprite(0, 0, 'not_match'); 
		fade_pulse_once(repeat_screen);
		sound_effects_fx.play('repeat');

		repeat_screen_timer.listen_to_timer_stopped_event('lvl2_repeat_screen', action);
		repeat_screen_timer.start(1);
	}

	function end()
	{
		LS_TEXT = '¡Hemos terminado!';

		repeat_screen_timer.destroy();

		done_evt.dispatch();
		done_evt.remove();
	}

	this.force_end = function ()
	{
		repeat_screen_timer.destroy();
		done_evt.remove();
	}
}