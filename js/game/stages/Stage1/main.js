function Stage1()
{
	//PRELOAD
	this.run = function()
	{
		game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.CANVAS, S1_NAME, { preload: preload, create: create });
	}

	function preload()
	{
		game.load.image('time_over', 'assets/backgrounds/split/time_over.png');
		game.load.image('match', 'assets/backgrounds/split/match.png');

		game.load.atlas(BACKGROUND_NAME, BACKGROUND_PATH, BACKGROUND_ATLAS);
		game.load.atlas(DIALOG_NAME, DIALOG_PATH, DIALOG_ATLAS);
		game.load.atlas(TEACHER_NAME, TEACHER_PATH, TEACHER_ATLAS);
		game.load.atlas(TIMER_NAME, TIMER_PATH, TIMER_ATLAS);
		game.load.atlas(MICRO_NAME, MICRO_PATH, MICRO_ATLAS);
		game.load.spritesheet(BUTTONS_SPRITESHEET, BUTTONS_ATLAS, BUTTONS_WIDTH, BUTTONS_HEIGHT, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICK);
		game.load.bitmapFont(NOKIA_BLACK_NAME, NOKIA_BLACK_PATH, NOKIA_BLACK_ATLAS);
		game.load.bitmapFont(NOKIA_WHITE_NAME, NOKIA_WHITE_PATH, NOKIA_WHITE_ATLAS);

		var audiolibrary = new AudioLibrary();
		game.load.audiosprite('sound_effects', audiolibrary.path_effects(), null, audiolibrary.sound_effects());
		game.load.audiosprite('voice', audiolibrary.path_voice(), null, audiolibrary.voice());
	}

	//CREATE
	function create()
	{
		load_background();
		run_countdown();
	}

	function load_background()
	{
		game.add.sprite(BACKGROUND_POSITION_X, BACKGROUND_POSITION_Y, BACKGROUND_NAME, BACKGROUND_BLACKBOARD_NAME);
	}

	function run_countdown()
	{
		var countdown = new CountDown(true);
		countdown.listen_done_event('s1_main', function (e) { run_level(1); });
		countdown.start();
	}

	function run_level(levelP)
	{
		var level = null;

		switch(levelP) 
		{
		    case 1:
		        level = new Level1();
		        break;
		    case 2:
		        level = new Level2();
		        break;
		    case 3:
		    	game.destroy();
		    	break;
		} 

		level.listen_to_done_event(function (e) { run_level(levelP + 1); });
		level.run();
	}
}