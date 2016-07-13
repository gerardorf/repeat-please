function Level2()
{
	var evt_mng = new Event_Manager();
	var activity_finished_evt = evt_mng.create('activity_finished_event');

	var teacher = null;
	var dialog_bubble = null;
	
	this.listen_to_done_event = function(action)
	{
		evt_mng.listen(activity_finished_evt, action);
	}

	this.run = function()
	{
		game.destroy();
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
		dialog_bubble.content = game.add.bitmapText(SMALL_DIALOG_CONTENT_X, SMALL_DIALOG_CONTENT_Y, DEFAULT_DIALOG_FONT, 'Hemos terminado.', DEFAULT_FONT_SIZE);
		fade_pulse(dialog_bubble.content);

		make_button(SMALL_DIALOG_CONTENT_X + 400, SMALL_DIALOG_CONTENT_Y - 5, 'Exit', activity_finished);

		teacher = game.add.sprite(0, S1_TEACHER_INITIAL_POSITION_Y, TEACHER_NAME, TEACHER_WELL_DONE);
	}

	function activity_finished()
	{
		evt_mng.dispatch(activity_finished_evt);
		evt_mng.remove(activity_finished_evt);
	}
}