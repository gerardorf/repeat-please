/*
- SHOWS THE 'REPEAT' PANEL
- ADDS THE KEYWORD TO THE BLACKBOARD
- READS THE KEYWORD
*/

function Level3()
{
	var repeat_screen = null;
	var teacher_voice = null;
	var key_word = null;

	this.run = function()
	{
		load_assets();
		run_animation();
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
		fade_pulse(key_word);
		play_sentence();
	}

	function play_sentence()
	{
		play_sound(teacher_voice, S1_CURRENT_SENTENCE);
	}
}