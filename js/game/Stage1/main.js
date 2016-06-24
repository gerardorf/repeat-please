function Stage1()
{
	var game = null;
	var teacher = null;

	var teacher_voice = null;
	var recorder = null;

	var sound_effects = null;

	var dialog_bubble = null;
	var dialog_texts = [];
	var dialog_buttons = []; 

	var out_of_time_event = null; 
	var countdown_started = null;

	////START
	this.run = function()
	{
		game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });
	}

	function preload()
	{

		game.load.atlas('teacher', 'js/game/Stage1/assets/characters/charset.png', 'js/game/Stage1/assets/characters/charset.json');
		game.load.atlas('dialogs', 'js/game/Stage1/assets/dialog/dialogs.png', 'js/game/Stage1/assets/dialog/dialogs.json');

		game.load.image('title', 'js/game/Stage1/assets/background/pizarra.png');
		game.load.image('timer_background', 'js/game/Stage1/assets/buttons/load_bar_background.png');
		game.load.image('timer_bar', 'js/game/Stage1/assets/buttons/load_bar.png');

		game.load.spritesheet('buttons', 'js/game/Stage1/assets/buttons/buttons.png', 224, 50, 2, 1, 1);

		game.load.bitmapFont('nokia_black', 'assets/fonts/nokia16black.png', 'assets/fonts/nokia16black.xml');
		game.load.bitmapFont('nokia_white', 'assets/fonts/nokia.png', 'assets/fonts/nokia.xml');

		teacher_voice = new Audio();
		sound_effects = new Audio();

		game.load.audiosprite('sentences', teacher_voice.path_sentences(), null, teacher_voice.sentences());
		game.load.audiosprite('sound_effects', sound_effects.path_effects(), null, sound_effects.sound_effects());

		recorder = new Recorder();
	}

	function create()
	{
		teacher_voice.set_fx(game.add.audioSprite('sentences'));
		teacher_voice.set_current_sprite('things');

		sound_effects.set_fx(game.add.audioSprite('sound_effects'));
		sound_effects.set_current_sprite('charm');
		sound_effects.play_event();

		game.add.image(0, 0, 'title');
		dialog_bubble = game.add.sprite(0, 0, 'dialogs', 'bottom');

		teacher = game.add.sprite(-415, 135, 'teacher', 'say_this');

		game.add.tween(teacher).to({ x: 0 }, 3000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);

		game.add.bitmapText(350, 50, 'nokia_white', teacher_voice.transcription(), 30);

		var text = game.add.bitmapText(350, 480, 'nokia_black', "Repeat after me.", 30);
		dialog_texts.push(text);

		make_button_listen(600, 470);
		make_button_record(600, 530);
	}

	function make_button_listen(x, y) 
	{
	   	var button = game.add.button(x, y, 'buttons', teacher_voice.play_event, this, 0, 1, 0);
	   	dialog_buttons.push(button);

	    var text = game.add.bitmapText(x, y + 15, 'nokia_black', "> Listen", 20);
    	text.x = button.x + 50;
    	dialog_texts.push(text);
	}
	

	function make_button_record(x, y) 
	{
	    var button = game.add.button(x, y, 'buttons', your_turn, this, 0, 1, 0);
	    dialog_buttons.push(button);

	    var text = game.add.bitmapText(x, y + 15, 'nokia_black', "> Repeat", 20);
    	text.x = button.x + 50;
    	dialog_texts.push(text);
	}
	////START

	var timer;

	////YOUR TURN
	function your_turn()
	{
		sound_effects.set_current_sprite('clock');

		switch_dialog_bubble();
		teacher.frameName = 'your_turn';

		var text = game.add.bitmapText(350, 155, 'nokia_black', "Your turn!", 30);
		dialog_texts.push(text);

		game.add.sprite(teacher);

		out_of_time = document.createEvent('Event');
		out_of_time.initEvent('out_of_time', true, true);
		document.addEventListener('out_of_time', function (e) { one_more_time(); }, false);

		countdown_started = document.createEvent('Event');
		countdown_started.initEvent('countdown_started', true, true);
		timer = new Timer();
		document.addEventListener('countdown_started', function (e) { timer.restart_timer(5, game, out_of_time);}, false);

		recorder.record(countdown_started);
	}

	function switch_dialog_bubble()
	{
		dialog_bubble.frameName = 'small';
		game.add.sprite(dialog_bubble);

		dialog_texts.forEach(clear_array);
		dialog_buttons.forEach(clear_array);
	}

	function clear_array(item,index,arr)
	{
		arr[index].destroy();
	}

	////YOUR TURN

	////ONE MORE TIME
	function one_more_time()
	{
		switch_dialog_bubble();
		teacher.frameName = 'again';

		var text = game.add.bitmapText(350, 155, 'nokia_black', "Repeat again...", 30);
		dialog_texts.push(text);

		document.addEventListener('out_of_time', function (e) { well_done(); }, false);

		timer.restart_timer(5, game, out_of_time);

		recorder.record(countdown_started);
	}

	////ONE MORE TIME

	////WELL DONE
	function well_done()
	{
		timer.stop();

		recorder = null;

		switch_dialog_bubble();
		teacher.frameName = 'well_done';

		var text = game.add.bitmapText(350, 155, 'nokia_black', "Well done!", 30);
		dialog_texts.push(text);

		make_button_next_stage(600, 145);

		teacher_voice.set_current_sprite('well_done');
		teacher_voice.play_event();
	}

	function make_button_next_stage(x, y) 
	{
	    var button = game.add.button(x, y, 'buttons', stage_clear, this, 0, 1, 0);
	    dialog_buttons.push(button);

	    var text = game.add.bitmapText(x, y + 15, 'nokia_black', "> Next stage", 20);
    	text.x = button.x + 50;
    	dialog_texts.push(text);
	}

	function stage_clear()
	{
		game.destroy();
		
		CURRENT_STATE = new Stage2();
		CURRENT_STATE.run();
	}
	////WELL DONE
}