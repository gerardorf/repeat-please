function Stage0()
{
	var game = null;

	this.run = function()
	{
		game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.CANVAS, 'stage 0', { preload: preload, create: create });
	}

	function preload()
	{
		game.load.image(BACKGROUND_NAME, BACKGROUND_PATH);
		game.load.image(FADER_NAME, FADER_PATH);
		game.load.image(DIALOG_NAME, DIALOG_PATH);
		game.load.image(TEACHER_NAME, TEACHER_PATH);
		game.load.spritesheet(START_BUTTON_SPRITESHEET, START_BUTTON_ATLAS, START_BUTTON_WIDTH, START_BUTTON_HEIGHT, START_BUTTON_NORMAL, START_BUTTON_HOVER, START_BUTTON_CLICK);
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
		background = game.add.image(0, 0, BACKGROUND_NAME);
		fader = game.add.image(0, -600, FADER_NAME);
	}

	function load_dialog()
	{
		dialog_bubble = game.add.image(DIALOG_X, DIALOG_Y, DIALOG_NAME);
		hide(dialog_bubble);

		dialog_bubble.content = game.add.bitmapText(DIALOG_TEXT_X, DIALOG_TEXT_Y, DIALOG_TEXT_FONT, DIALOG_TEXT_CONTENT, DIALOG_TEXT_FONT_SIZE);
		hide(dialog_bubble.content);

		make_button(START_BUTTON_NAME, START_BUTTON_CONTENT, START_BUTTON_X, START_BUTTON_Y);
	}

	function load_teacher()
	{
		teacher = game.add.image(0, 50, TEACHER_NAME);
	}

	function make_button(name, text, x, y) 
	{
	    start_button = game.add.button(x, y, START_BUTTON_SPRITESHEET, stage_clear, this, 0, 1, 0);
	    start_button.name = name;
	    start_button.smoothed = false;
	    hide(start_button);

	    start_button.content = game.add.bitmapText(x, y + 15, START_BUTTON_FONT, text, START_BUTTON_FONT_SIZE);
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

		CURRENT_STAGE = new Stage1();
		CURRENT_STAGE.run();
	}
}