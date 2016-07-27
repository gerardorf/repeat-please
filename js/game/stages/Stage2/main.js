function Stage2()
{
	var timer_bar = new RemainingTimeBar(BLACK_PLAIN_DIALOG_POSITION_X + 4, BLACK_PLAIN_DIALOG_POSITION_Y + 4);

	var current_level = null;
	var last_level = 3;

	var dialog_bubble = null;
	var teacher = null;
	var button_listen = null;
	
	var sentences_fx = null;

	//PRELOAD
	this.run = function()
	{
		game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.CANVAS, S2_NAME, { preload: preload, create: create });
	}

	function preload()
	{
		preload_images();
		preload_fonts();
		preload_audio();
	}

	function preload_images()
	{
		game.load.image('not_match', 'assets/backgrounds/split/not_match.png');
		game.load.atlas(BACKGROUND_NAME, BACKGROUND_PATH, BACKGROUND_ATLAS);
		game.load.atlas(DIALOG_NAME, DIALOG_PATH, DIALOG_ATLAS);
		game.load.atlas(TEACHER_NAME, TEACHER_PATH, TEACHER_ATLAS);
		game.load.atlas(TIMER_NAME, TIMER_PATH, TIMER_ATLAS);
		game.load.atlas(MICRO_NAME, MICRO_PATH, MICRO_ATLAS);
		game.load.spritesheet(BUTTONS_SPRITESHEET, BUTTONS_ATLAS, BUTTONS_WIDTH, BUTTONS_HEIGHT, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICK);
	}

	function preload_fonts()
	{
		game.load.bitmapFont(NOKIA_BLACK_NAME, NOKIA_BLACK_PATH, NOKIA_BLACK_ATLAS);
		game.load.bitmapFont(NOKIA_WHITE_NAME, NOKIA_WHITE_PATH, NOKIA_WHITE_ATLAS);
	}

	function preload_audio()
	{
		game.load.audiosprite(S2_SOUND_EFFECTS, SOUND_EFFECTS_ATLAS, null, SOUNDEFFECTSJSON.get());
		game.load.audiosprite(S2_SENTENCES, SENTENCES_ATLAS, null, SENTENCESJSON.get());
		game.load.audiosprite(S2_KEYWORDS, KEYWORDS_ATLAS, null, KEYWORDSJSON.get());
	}

	//CREATE
	function create()
	{
		load_assets();
		run_animtaion();
		run_logic();

		game.onResume.add(reset_game, this);
	}

	function load_assets()
	{
		load_background();
		load_dialog();
		load_teacher();
		load_sounds();
	}

	function load_background()
	{
		game.add.sprite(BACKGROUND_POSITION_X, BACKGROUND_POSITION_Y, BACKGROUND_NAME, BACKGROUND_BLACKBOARD_NAME);
	}

	function load_dialog()
	{
		dialog_bubble = game.add.sprite(BOTTOM_DIALOG_POSITION_X, BOTTOM_DIALOG_POSITION_Y, DIALOG_NAME, BOTTOM_DIALOG_NAME);
		dialog_bubble.content = game.add.bitmapText(BOTTOM_DIALOG_CONTENT_X, BOTTOM_DIALOG_CONTENT_Y, DEFAULT_DIALOG_FONT, S1_BOTTOM_DIALOG_CONTENT, DEFAULT_FONT_SIZE);
		
		button_listen = make_button(S1_BUTTON_LISTEN_POSITION_X, S1_BUTTON_LISTEN_POSITION_Y, S1_LISTEN_BUTTON_CONTENT, play_sentence);
	}

	function load_teacher()
	{
		teacher = game.add.sprite(S1_TEACHER_INITIAL_POSITION_X, S1_TEACHER_INITIAL_POSITION_Y, TEACHER_NAME, TEACHER_POINTING);
	}

	function load_sounds()
	{
		sentences_fx = game.add.audioSprite(S2_SENTENCES);
	}

	function play_sentence()
	{
		sentences_fx.play(S2_CURRENT_SENTENCE);
	}

	function run_animtaion()
	{
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
		timer_bar.listen_to_done_event('s2_main', time_out);
		timer_bar.start(S2_TOTAL_TIME, true);
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
		        current_level = new Level2(teacher);
	        	break;

		    case last_level:
		    	current_level = new Last_Level();
		    	break;
		    default:
		    	current_level = new Level1(2);
		        break;
		}

		current_level.number = level_number;
		current_level.listen_to_done_event(run_next_level);
		current_level.run();
	}

	//CANCEL
	function reset_game(event)
	{
		timer_bar.destroy();
		RECORDER_INSTANCE.force_end();
		current_level.force_end();
		restart_all();
	}
}