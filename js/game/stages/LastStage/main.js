LS_TEXT = 'Hemos terminado.';

function Last_Stage()
{
	var teacher = null;
	var dialog_bubble = null;

	this.run = function()
	{
		game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.CANVAS, S1_NAME, { preload: preload, create: create });
	}

	function preload()
	{
		game.load.atlas(BACKGROUND_NAME, BACKGROUND_PATH, BACKGROUND_ATLAS);
		game.load.atlas(TEACHER_NAME, TEACHER_PATH, TEACHER_ATLAS);
		game.load.atlas(DIALOG_NAME, DIALOG_PATH, DIALOG_ATLAS);
		game.load.bitmapFont(NOKIA_BLACK_NAME, NOKIA_BLACK_PATH, NOKIA_BLACK_ATLAS);
		game.load.spritesheet(BUTTONS_SPRITESHEET, BUTTONS_ATLAS, BUTTONS_WIDTH, BUTTONS_HEIGHT, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICK);
	}

	//CREATE
	function create()
	{
		game.add.sprite(BACKGROUND_POSITION_X, BACKGROUND_POSITION_Y, BACKGROUND_NAME, BACKGROUND_BLACKBOARD_NAME);

		dialog_bubble = game.add.sprite(SMALL_DIALOG_POSITION_X, SMALL_DIALOG_POSITION_Y, DIALOG_NAME, SMALL_DIALOG_NAME);
		dialog_bubble.content = game.add.bitmapText(SMALL_DIALOG_CONTENT_X, SMALL_DIALOG_CONTENT_Y, DEFAULT_DIALOG_FONT, LS_TEXT, DEFAULT_FONT_SIZE);
		fade_pulse(dialog_bubble.content);

		teacher = game.add.sprite(0, S1_TEACHER_INITIAL_POSITION_Y, TEACHER_NAME, TEACHER_WELL_DONE);

		make_button(SMALL_DIALOG_CONTENT_X + 400, SMALL_DIALOG_CONTENT_Y - 30, 'Relanzar', restart_activity);
		make_button(SMALL_DIALOG_CONTENT_X + 400, SMALL_DIALOG_CONTENT_Y + 25, 'Terminar', restart_all);
	}
}