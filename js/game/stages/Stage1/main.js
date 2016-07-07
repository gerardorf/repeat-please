function Stage1()
{
	////START
	this.run = function()
	{
		game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.CANVAS, S1_NAME, { preload: preload, create: create });
	}

	function preload()
	{
		preload_images();
		preload_audio();
	}

	function preload_images()
	{
		game.load.atlas(BACKGROUND_NAME, BACKGROUND_PATH, BACKGROUND_ATLAS);
		game.load.atlas(DIALOG_NAME, DIALOG_PATH, DIALOG_ATLAS);
		game.load.atlas(TEACHER_NAME, TEACHER_PATH, TEACHER_ATLAS);
		game.load.atlas(TIMER_NAME, TIMER_PATH, TIMER_ATLAS);
		game.load.atlas(MICRO_NAME, MICRO_PATH, MICRO_ATLAS);
		game.load.spritesheet(BUTTONS_SPRITESHEET, BUTTONS_ATLAS, BUTTONS_WIDTH, BUTTONS_HEIGHT, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICK);
		game.load.bitmapFont(NOKIA_BLACK_NAME, NOKIA_BLACK_PATH, NOKIA_BLACK_ATLAS);
		game.load.bitmapFont(NOKIA_WHITE_NAME, NOKIA_WHITE_PATH, NOKIA_WHITE_ATLAS);
	}

	var teacher_voice = null;
	var sound_effects = null;
	function preload_audio()
	{
		teacher_voice = new Audio();
		game.load.audiosprite('sentences', teacher_voice.path_sentences(), null, teacher_voice.sentences());

		sound_effects = new Audio();
		game.load.audiosprite('sound_effects', sound_effects.path_effects(), null, sound_effects.sound_effects());
	}

	var background = null;
	var sentence = null;

	var dialog_bubble = null;
	var dialog_texts = [];
	var dialog_buttons = []; 

	var teacher = null;

	function create()
	{
		load_background();
		load_audio();
		run_animation();
	}

	function load_assets()
	{
		load_dialog();
		load_teacher();
	}

	function load_background()
	{
		background = game.add.sprite(BACKGROUND_POSITION_X, BACKGROUND_POSITION_Y, BACKGROUND_NAME, BACKGROUND_BLACKBOARD_NAME);
	}

	function load_dialog()
	{
		dialog_bubble = game.add.sprite(BOTTOM_DIALOG_POSITION_X, BOTTOM_DIALOG_POSITION_Y, DIALOG_NAME, BOTTOM_DIALOG_NAME);
		add_text(game.add.bitmapText(BOTTOM_DIALOG_CONTENT_X, BOTTOM_DIALOG_CONTENT_Y, DEFAULT_DIALOG_FONT, S1_BOTTOM_DIALOG_CONTENT, DEFAULT_FONT_SIZE));

		add_button(button_listen());
		add_button(button_repeat());
	}

	function button_listen()
	{
		return make_button(S1_BUTTON_LISTEN_POSITION_X, S1_BUTTON_LISTEN_POSITION_Y, S1_LISTEN_BUTTON_CONTENT, teacher_reads_sentence);
	}

	function button_repeat()
	{
		return make_button(S1_BUTTON_REPEAT_POSITION_X, S1_BUTTON_REPEAT_POSITION_Y, S1_REPEAT_BUTTON_CONTENT, record_student_voice);
	}

	function load_teacher()
	{
		teacher = game.add.sprite(S1_TEACHER_INITIAL_POSITION_X, S1_TEACHER_INITIAL_POSITION_Y, TEACHER_NAME, TEACHER_POINTING_NAME);
	}

	function load_audio()
	{
		sound_effects.set_fx(game.add.audioSprite('sound_effects'), 'charm');
		teacher_voice.set_fx(game.add.audioSprite('sentences'), 'things');
	}

	function run_animation()
	{
		show_countdown();
	}

	var countdown = null;
	var timer = null;
	function show_countdown()
	{
		timer = new Timer();
		countdown_next_event = document.addEventListener(timer.timer_stopped_event('countdown_next_event'), function (e) { update_countdown(); }, false);

		update_countdown();
	}

	function update_countdown()
	{
		if(countdown == null)
		{
			countdown = game.add.sprite(COUNTDOWN_ANIMATION_X, COUNTDOWN_ANIMATION_Y, TIMER_NAME, COUNTDOWN_3_NAME);
			play_sound(sound_effects, 'normal_countdown_tone');
			fade_pulse_once(countdown);

			timer.start_timer(0, false);
		}
		else if(countdown.frameName == COUNTDOWN_3_NAME)
		{
			countdown.frameName = COUNTDOWN_2_NAME;
			play_sound(sound_effects, 'normal_countdown_tone');
			fade_pulse_once(countdown);
			timer.start_timer(0, false);
		}
		else if(countdown.frameName == COUNTDOWN_2_NAME)
		{
			countdown.frameName = COUNTDOWN_1_NAME;
			play_sound(sound_effects, 'normal_countdown_tone');
			fade_pulse_once(countdown);
			timer.start_timer(0, false);
		} 
		else if(countdown.frameName == COUNTDOWN_1_NAME) 
		{
			countdown.frameName = COUNTDOWN_GO_NAME;
			countdown.x = SCREEN_WIDTH / 7;
			play_sound(sound_effects, 'final_countdown_tone');
			fade_pulse_once(countdown);
			timer.start_timer(0, false);
		}
		else if(countdown.frameName == COUNTDOWN_GO_NAME) 
		{
			hide(countdown);

			load_assets();
			sentence = game.add.bitmapText(BLACKBOARD_TEXT_POSITION_X, BLACKBOARD_TEXT_POSITION_Y, NOKIA_WHITE_NAME, teacher_voice.transcription(), DEFAULT_FONT_SIZE);
			drag(teacher, { x: 0 });
			teacher_reads_sentence();
		}
	}
	////START

	////PLAY
	function teacher_reads_sentence()
	{
		//teacher.frameName = TEACHER_SPEAKING;
		play_sound(teacher_voice, S1_TEACHER_CURRENT_SENTENCE);
	}
	////PLAY

	////RECORD
	var recorder = null;

	function record_student_voice()
	{
		load_small_dialog_bubble();

		teacher.frameName = random_repeat_frame();

		recorder = new Recorder(S1_MICRO_POSITION_X, S1_MICRO_POSITION_Y);
		document.addEventListener(recorder.done_event('record_finished'), function (e) { record_finished(); }, false);
		recorder.start_recording();
	}

	function load_small_dialog_bubble()
	{
		dialog_texts.forEach(clear_array);
		dialog_buttons.forEach(clear_array);

		dialog_bubble.frameName = SMALL_DIALOG_NAME;

		dialog_bubble.content = game.add.bitmapText(SMALL_DIALOG_CONTENT_X, SMALL_DIALOG_CONTENT_Y, DEFAULT_DIALOG_FONT, S1_SMALL_DIALOG_00, DEFAULT_FONT_SIZE);
		add_text(dialog_bubble.content);
	}

	function clear_array(item, index, arr)
	{
		arr[index].destroy();
	}

	function record_finished()
	{
		well_done();
	}
	////RECORD

	////WELL DONE
	function well_done()
	{
		dialog_bubble.content.text = S1_SMALL_DIALOG_05;
		sentence.destroy();

		teacher.frameName = TEACHER_WELL_DONE;

		make_button(600, 145, S1_NEXT_STAGE_BUTTON_CONTENT, stage_clear);

		play_sound(sound_effects, 'well_done');
	}
	////WELL DONE

	function add_button(button)
	{
		dialog_buttons.push(button);
		add_text(button.content);
	}

	function add_text(text)
	{
		dialog_texts.push(text);
	}
	
	function stage_clear()
	{
		game.destroy();
		next_stage();
	}
}