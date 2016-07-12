function Level1()
{
	var sentence = null; //The sentence written in the blackboard.

	var dialog_bubble = null;
	var teacher = null;
	var button_listen = null;
	var timer_dialog = null;

	var teacher_voice = null;
	var sound_effects = null;

	var evt_mng = new Event_Manager();
	var activity_finished_evt = evt_mng.create('activity_finished_event');
	var timer = null;
	
	this.listen_to_done_event = function(action)
	{
		evt_mng.listen(activity_finished_evt, action);
	}

	this.run = function()
	{
		load_assets();
		run_animation();
	}

	function load_assets()
	{
		load_dialog();
		load_teacher();
		load_timer();
		load_audio();
	}

	function load_dialog()
	{
		dialog_bubble = game.add.sprite(BOTTOM_DIALOG_POSITION_X, BOTTOM_DIALOG_POSITION_Y, DIALOG_NAME, BOTTOM_DIALOG_NAME);
		dialog_bubble.content = game.add.bitmapText(BOTTOM_DIALOG_CONTENT_X, BOTTOM_DIALOG_CONTENT_Y, DEFAULT_DIALOG_FONT, S1_BOTTOM_DIALOG_CONTENT, DEFAULT_FONT_SIZE);
		
		button_listen = make_button(S1_BUTTON_LISTEN_POSITION_X, S1_BUTTON_LISTEN_POSITION_Y, S1_LISTEN_BUTTON_CONTENT, teacher_reads_sentence);
	}

	function load_teacher()
	{
		teacher = game.add.sprite(S1_TEACHER_INITIAL_POSITION_X, S1_TEACHER_INITIAL_POSITION_Y, TEACHER_NAME, TEACHER_POINTING_NAME);
	}

	function load_timer()
	{
		timer_dialog = game.add.sprite(BLACK_PLAIN_DIALOG_POSITION_X, BLACK_PLAIN_DIALOG_POSITION_Y, DIALOG_NAME, BLACK_PLAIN_NAME);
	}

	function load_audio()
	{
		sound_effects = new Audio();
		sound_effects.set_fx(game.add.audioSprite('sound_effects'), 'charm');

		teacher_voice = new Audio();
		teacher_voice.set_fx(game.add.audioSprite('voice'), 'things');

		sentence = game.add.bitmapText(BLACKBOARD_TEXT_POSITION_X, BLACKBOARD_TEXT_POSITION_Y, NOKIA_WHITE_NAME, teacher_voice.transcription(), HUGE_FONT_SIZE);
		S1_CURRENT_SENTENCE = 'things';
	}

	function run_animation()
	{
		drag(teacher, { x: 0 });
		teacher_reads_sentence();
		start_timer();
		record_student_voice();
	}

	function teacher_reads_sentence()
	{
		play_sound(teacher_voice, S1_CURRENT_SENTENCE);
	}

	function start_timer()
	{
		timer = new Timer(BLACK_PLAIN_DIALOG_POSITION_X + 4, BLACK_PLAIN_DIALOG_POSITION_Y + 4);
		timer.listen_to_timer_stopped_event('level1', function (e) { activity_finished(); });
		timer.start(S1_TOTAL_TIME, true);
	}

	function record_student_voice()
	{
		teacher.frameName = random_repeat_frame();

		RECORDER_INSTANCE.set_icon_at(S1_MICRO_POSITION_X, S1_MICRO_POSITION_Y);
		RECORDER_INSTANCE.listen_to_done_event(function (e) { record_finished(); });
		RECORDER_INSTANCE.start_recording();
	}

	function record_finished()
	{
		console.log('record finished');
	}

	function activity_finished()
	{
		RECORDER_INSTANCE.stop_recording();

		evt_mng.dispatch(activity_finished_evt);
		evt_mng.remove(activity_finished_evt);
	}
}