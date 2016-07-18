function Stage2()
{
	var timer = null;

	var current_level = null;
	var last_level = 3;

	var dialog_bubble = null;
	var teacher = null;
	var button_listen = null;

	//PRELOAD
	this.run = function()
	{
		game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.CANVAS, S2_NAME, { preload: preload, create: create });
	}

	function preload()
	{
		game.load.image('not_match', 'assets/backgrounds/split/not_match.png');

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
		load_assets();
		run_animtaion();
		run_logic();
	}

	function load_assets()
	{
		load_background();
		load_teacher();
		load_dialog();
	}

	function load_background()
	{
		game.add.sprite(BACKGROUND_POSITION_X, BACKGROUND_POSITION_Y, BACKGROUND_NAME, BACKGROUND_BLACKBOARD_NAME);
	}

	function load_teacher()
	{
		teacher = game.add.sprite(S1_TEACHER_INITIAL_POSITION_X, S1_TEACHER_INITIAL_POSITION_Y, TEACHER_NAME, TEACHER_POINTING_NAME);
	}

	function load_dialog()
	{
		dialog_bubble = game.add.sprite(BOTTOM_DIALOG_POSITION_X, BOTTOM_DIALOG_POSITION_Y, DIALOG_NAME, BOTTOM_DIALOG_NAME);
		dialog_bubble.content = game.add.bitmapText(BOTTOM_DIALOG_CONTENT_X, BOTTOM_DIALOG_CONTENT_Y, DEFAULT_DIALOG_FONT, S1_BOTTOM_DIALOG_CONTENT, DEFAULT_FONT_SIZE);
		
		button_listen = make_button(S1_BUTTON_LISTEN_POSITION_X, S1_BUTTON_LISTEN_POSITION_Y, S1_LISTEN_BUTTON_CONTENT, play_sentence);
	}

	function play_sentence()
	{
		play_sound(teacher_voice, S1_CURRENT_SENTENCE);
	}

	function run_animtaion()
	{
		teacher.frameName = random_repeat_frame();
		drag(teacher, { x: 0 });
	}

	function run_logic()
	{
		start_timer();
		start_recorder();
		run_next_level();
	}

	function start_timer()
	{
		timer = new Remaining_Time_Bar(BLACK_PLAIN_DIALOG_POSITION_X + 4, BLACK_PLAIN_DIALOG_POSITION_Y + 4);
		timer.listen_to_done_event('s2_main', function (e) { time_out(); });
		timer.start(S2_TOTAL_TIME, true);
	}

	function start_recorder()
	{
		RECORDER_INSTANCE.set_icon_at(S1_MICRO_POSITION_X, S1_MICRO_POSITION_Y);
		RECORDER_INSTANCE.start_recording();
	}

	function time_out()
	{
		LS_TEXT = '¡Se ha acabado el tiempo!';
		run_level(last_level);
	}

	function run_next_level()
	{
		var next_lvl = 0;

		if(current_level != null)
		{
			next_lvl = current_level.number + 1;
		}
		else
		{
			next_lvl = 1;
		}

		run_level(next_lvl);
	}

	function run_level(level_number)
	{
		console.log(level_number);
		current_level = null;

		switch(level_number) 
		{
		    case 1:
		        current_level = new Level1(2);
		        break;

	        case 2:
		        current_level = new Level2();
	        	break;

		    case last_level:
		    	current_level = new Last_Level();
		    	break;
		}

		current_level.number = level_number;
		current_level.listen_to_done_event(function (e) { run_next_level(); });
		current_level.run();
	}
}