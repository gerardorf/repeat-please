function Stage0()
{
	var background = null;
	var fader = null;
	var dialog_bubble = null;
	var start_button = null;
	var teacher = null;

	var sound_effects = 'sound_effects';
	var fx = null;

	this.run = function()
	{
		game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.CANVAS, S0_NAME, { preload: preload, create: create });
	}

	//PRELOAD
	function preload()
	{
		preload_images();
		preload_fonts();
		preload_audio();
	}

	function preload_images()
	{
		game.load.atlas(BACKGROUND_NAME, BACKGROUND_PATH, BACKGROUND_ATLAS);
		game.load.atlas(DIALOG_NAME, DIALOG_PATH, DIALOG_ATLAS);
		game.load.atlas(TEACHER_NAME, TEACHER_PATH, TEACHER_ATLAS);
		game.load.atlas(MICRO_NAME, MICRO_PATH, MICRO_ATLAS);
		game.load.spritesheet(BUTTONS_SPRITESHEET, BUTTONS_ATLAS, BUTTONS_WIDTH, BUTTONS_HEIGHT, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICK);
	}

	function preload_fonts()
	{
		game.load.bitmapFont(NOKIA_BLACK_NAME, NOKIA_BLACK_PATH, NOKIA_BLACK_ATLAS);
	}

	function preload_audio()
	{
		game.load.audiosprite(sound_effects, SOUND_EFFECTS_ATLAS, null, SOUNDEFFECTSJSON.get());
	}

	//CREATE
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
		load_sound();
	}

	function load_background()
	{
		background = game.add.sprite(BACKGROUND_POSITION_X, BACKGROUND_POSITION_Y, BACKGROUND_NAME, BACKGROUND_CLASSROOM_NAME);
		fader = game.add.sprite(S0_FADER_INITIAL_POSITION_X, S0_FADER_INITIAL_POSITION_Y, BACKGROUND_NAME, BACKGROUND_FADER_NAME);
	}

	function load_dialog()
	{
		dialog_bubble = game.add.sprite(BIG_SQUARE_DIALOG_POSITION_X, BIG_SQUARE_DIALOG_POSITION_Y, DIALOG_NAME, BIG_SQUARE_DIALOG_NAME);
		dialog_bubble.content = game.add.bitmapText(BIG_SQUARE_DIALOG_CONTENT_X, BIG_SQUARE_DIALOG_CONTENT_Y, DEFAULT_DIALOG_FONT, S0_DIALOG_TEXT_CONTENT, DEFAULT_FONT_SIZE);

		RECORDER_INSTANCE = new Recorder(S0_BUTTON_X, S0_BUTTON_Y);
		RECORDER_INSTANCE.listen_to_micro_acquired_event(function (e) { micro_acquired(); });
		RECORDER_INSTANCE.get_user_media();
	}

	function micro_acquired()
	{
		start_button = make_button(S0_BUTTON_X, S0_BUTTON_Y, S0_BUTTON_CONTENT, stage_clear);

		fade_in(start_button);
		fade_in(start_button.content);
	}

	function load_teacher()
	{
		teacher = game.add.sprite(S0_TEACHER_INITIAL_POSITION_X, S0_TEACHER_INITIAL_POSITION_Y, TEACHER_NAME, TEACHER_HELLO);
	}

	function load_sound()
	{
		fx = game.add.audioSprite(sound_effects);
	}

	function run_animation()
	{
		fx.play('charm');

		drag(fader, { y: 0 });

		fade_in(dialog_bubble);
		fade_in(dialog_bubble.content);

		drag(teacher, { x: 800 });
	}
}