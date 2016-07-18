/*
- sHOWS DE 'REPEAT' PANEL
- SHOWS A SENTENCE AND READS IT
*/

function Level2()
{
	var repeat_screen = null;
	var teacher_voice = null;

	this.run = function()
	{
		load_assets();
		run_animation();
	}

	function load_assets()
	{
		repeat_screen = game.add.sprite(0, 0, 'not_match'); //Ask the user to repeat

		teacher_voice = new Audio();
		teacher_voice.set_fx(game.add.audioSprite('voice'), 'things');
	}

	function run_animation()
	{
		fade_pulse_once(repeat_screen);
		play_sentence();
	}

	function play_sentence()
	{
		play_sound(teacher_voice, S1_CURRENT_SENTENCE);
	}
}