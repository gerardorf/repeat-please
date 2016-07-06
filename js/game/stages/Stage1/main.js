function Stage1()
{
	var game = null;

	var teacher_voice = null;
	var sound_effects = null;

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
		load_assets();
		load_audio();
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
		background = game.add.sprite(BACKGROUND_POSITION_X, BACKGROUND_POSITION_Y, BACKGROUND_NAME, BACKGROUND_BLACKBOARD_NAME);
	}

	function load_dialog()
	{
		dialog_bubble = game.add.sprite(BOTTOM_DIALOG_POSITION_X, BOTTOM_DIALOG_POSITION_Y, DIALOG_NAME, BOTTOM_DIALOG_NAME);
		dialog_texts.push(game.add.bitmapText(BOTTOM_DIALOG_CONTENT_X, BOTTOM_DIALOG_CONTENT_Y, DEFAULT_DIALOG_FONT, S1_BOTTOM_DIALOG_CONTENT, DEFAULT_FONT_SIZE));

		make_button_listen(S1_BUTTON_LISTEN_POSITION_X, S1_BUTTON_LISTEN_POSITION_Y);
		make_button_record(S1_BUTTON_REPEAT_POSITION_X, S1_BUTTON_REPEAT_POSITION_Y);
	}

	function load_teacher()
	{
		teacher = game.add.sprite(S1_TEACHER_INITIAL_POSITION_X, S1_TEACHER_INITIAL_POSITION_Y, TEACHER_NAME, TEACHER_POINTING_NAME);
	}

	function load_audio()
	{
		recorder = new Recorder(game);
		
		sound_effects.set_fx(game.add.audioSprite('sound_effects'));
		sound_effects.set_current_sprite('charm');
		sound_effects.play_event();

		teacher_voice.set_fx(game.add.audioSprite('sentences'));
		teacher_voice.set_current_sprite('things');
		sentence = game.add.bitmapText(BLACKBOARD_TEXT_POSITION_X, BLACKBOARD_TEXT_POSITION_Y, NOKIA_WHITE_NAME, teacher_voice.transcription(), DEFAULT_FONT_SIZE);
	}

	function make_button_listen(x, y) 
	{
		make_button(x, y, S1_LISTEN_BUTTON_CONTENT, teacher_speaks);
	}
	
	function make_button_record(x, y) 
	{
		make_button(x, y, S1_REPEAT_BUTTON_CONTENT, record_student_voice);
	}

	function run_animation()
	{
		game.add.tween(teacher).to({ x: 0 }, 3000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	}
	////START

	////PLAY
	function teacher_speaks()
	{
		teacher.frameName = TEACHER_SPEAKING;
		teacher_voice.play_event();
	}
	////PLAY

	////RECORD
	var timer = null;
	var recorder = null;

	function record_student_voice()
	{
		load_small_dialog_bubble();
		teacher.frameName = random_repeat_frame();
		load_timers();
	}

	function load_small_dialog_bubble()
	{
		dialog_texts.forEach(clear_array);
		dialog_buttons.forEach(clear_array);

		dialog_bubble.frameName = SMALL_DIALOG_NAME;
		dialog_bubble.content = game.add.bitmapText(SMALL_DIALOG_CONTENT_X, SMALL_DIALOG_CONTENT_Y, DEFAULT_DIALOG_FONT, S1_SMALL_DIALOG_00, DEFAULT_FONT_SIZE);
		dialog_bubble.icon = game.add.sprite(S1_TIMER_POSITION_X, S1_TIMER_POSITION_Y, MICRO_NAME, MICRO_OFF);
		fade(dialog_bubble.icon);
		dialog_texts.push(dialog_bubble.content);
	}

	function fade(element)
	{
		element.alpha = TRANSPARENT;
		animate(element, { alpha: OPAQUE });
	}

	function stop_fade(element)
	{
		element.alpha = OPAQUE;
		animate(element, { alpha: OPAQUE })
	}

	function animate(element, action)
	{
		game.add.tween(element).to(action, 1000, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
	}

	function clear_array(item, index, arr)
	{
		arr[index].destroy();
	}

	function load_timers()
	{
		timer = new Timer(game, 'activity_timer_started_event', 'activity_timer_stopped_event');
		
		document.addEventListener(timer.timer_started_event(), function (e) { start_recording(); }, false);
		document.addEventListener(timer.timer_stopped_event(), function (e) { stop_recording(); }, false);

		timer.start_timer(5, false);
	}

	function start_recording()
	{
		document.addEventListener(recorder.voice_detected_event(), function (e) { dialog_bubble.icon.frameName = MICRO_ON_DETECTION; stop_fade(dialog_bubble.icon); }, false);
		document.addEventListener(recorder.voice_not_detected_event(), function (e) { dialog_bubble.icon.frameName = MICRO_ON_NO_DETECTION; }, false);

		recorder.start_recording();
	}

	function stop_recording()
	{
		recorder.stop_recording();
		well_done();
	}
	////RECORD

	////WELL DONE
	function well_done()
	{
		dialog_bubble.content.text = S1_SMALL_DIALOG_05;
		dialog_bubble.icon.destroy();
		teacher.frameName = TEACHER_WELL_DONE;

		make_button_next_stage(600, 145);

		teacher_voice.set_current_sprite('well_done');
		teacher_voice.play_event();
	}

	function make_button_next_stage(x, y) 
	{
		make_button(x, y, S1_NEXT_STAGE_BUTTON_CONTENT, stage_clear);
	}
	////WELL DONE

	function make_button(x, y, text, action)
	{
		var button = game.add.button(x, y, BUTTONS_SPRITESHEET, action, this, 0, 1, 0);
	    button.content = game.add.bitmapText(x, y + 15, BUTTONS_FONT, text, BUTTONS_FONT_SIZE);
    	button.content.x = button.x + 50;
    	dialog_texts.push(button.content);
    	dialog_buttons.push(button);
	}
	
	function stage_clear()
	{
		game.destroy();
		next_stage();
	}
}