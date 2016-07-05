function Stage0()
{
	var game = null;

	this.run = function()
	{
		game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.CANVAS, S0_NAME, { preload: preload, create: create });
	}

	function preload()
	{
		game.load.atlas(BACKGROUND_NAME, BACKGROUND_PATH, BACKGROUND_ATLAS);
		game.load.atlas(DIALOG_NAME, DIALOG_PATH, DIALOG_ATLAS);
		game.load.atlas(TEACHER_NAME, TEACHER_PATH, TEACHER_ATLAS);
		game.load.spritesheet(BUTTONS_SPRITESHEET, BUTTONS_ATLAS, BUTTONS_WIDTH, BUTTONS_HEIGHT, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICK);
		game.load.bitmapFont(NOKIA_BLACK_NAME, NOKIA_BLACK_PATH, NOKIA_BLACK_ATLAS);
	}

	var background = null;
	var fader = null;

	var dialog_bubble = null;
	var start_button = null;

	var teacher = null;

	function create()
	{
		load_assets();
		run_animation();
	}

	function load_assets()
	{
		load_background();
		load_dialog();
		load_teacher();
	}

	function load_background()
	{
		background = game.add.sprite(BACKGROUND_POSITION_X, BACKGROUND_POSITION_Y, BACKGROUND_NAME, BACKGROUND_CLASSROOM_NAME);
		fader = game.add.sprite(S0_FADER_INITIAL_POSITION_X, S0_FADER_INITIAL_POSITION_Y, BACKGROUND_NAME, BACKGROUND_FADER_NAME);
	}

	function load_dialog()
	{
		dialog_bubble = game.add.sprite(BIG_SQUARE_DIALOG_POSITION_X, BIG_SQUARE_DIALOG_POSITION_Y, DIALOG_NAME, BIG_SQUARE_DIALOG_NAME);
		hide(dialog_bubble);

		dialog_bubble.content = game.add.bitmapText(BIG_SQUARE_DIALOG_CONTENT_X, BIG_SQUARE_DIALOG_CONTENT_Y, DEFAULT_DIALOG_FONT, S0_DIALOG_TEXT_CONTENT, DEFAULT_FONT_SIZE);
		hide(dialog_bubble.content);

		make_button(S0_BUTTON_CONTENT, S0_BUTTON_X, S0_BUTTON_Y);
	}

	function load_teacher()
	{
		teacher = game.add.sprite(S0_TEACHER_INITIAL_POSITION_X, S0_TEACHER_INITIAL_POSITION_Y, TEACHER_NAME, TEACHER_HELLO_NAME);
	}

	function make_button(text, x, y) 
	{
	    start_button = game.add.button(x, y, BUTTONS_SPRITESHEET, stage_clear, this, 0, 1, 0);
	    start_button.smoothed = false;
	    hide(start_button);

	    start_button.content = game.add.bitmapText(x, y + 15, BUTTONS_FONT, text, BUTTONS_FONT_SIZE);
    	start_button.content.x += (start_button.width / 2) - (start_button.content.textWidth / 2);
    	hide(start_button.content);
	}

	function run_animation()
	{
		hide_background();

		fade(dialog_bubble);
		fade(dialog_bubble.content);
		fade(start_button);
		fade(start_button.content);

		drag_teacher();
	}

	function hide_background()
	{
		animate(fader, { y: 0 });
	}

	function fade(element)
	{
		animate(element, { alpha: OPAQUE });
	}

	function drag_teacher()
	{
		animate(teacher, { x: 800 });
	}

	function animate(element, action)
	{
		game.add.tween(element).to(action, 3000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	}

	function hide(element)
	{
		element.alpha = TRANSPARENT;
	}

	function stage_clear()
	{
		game.destroy();
		next_stage();
	}
}