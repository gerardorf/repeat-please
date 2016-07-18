/*
- SHOWS A SENTENCE AND READS IT
*/

function Level1()
{
	var sentence = null;

	var teacher_voice = null;
	var sound_effects = null;

	this.run = function()
	{
		load_assets();
		run_animation();
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

	function run_repeat_animation()
	{
		repeat_screen = game.add.sprite(0, 0, 'not_match');
		fade_pulse_once(sentence);
		play_sentence();
	}

	function play_sentence()
	{
		play_sound(teacher_voice, S1_CURRENT_SENTENCE);
	}
}