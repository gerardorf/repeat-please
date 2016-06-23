function Stage1()
{
	var game = null;
	var teacher = null;

	var audio = null;
	var recorder = null;

	this.run = function()
	{
		game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });
	}

	function preload()
	{
		game.load.image('title', 'js/game/Stage1/assets/background/pizarra.png');
		game.load.image('teacher', 'js/game/Stage1/assets/characters/say_this.png');
		game.load.image('dialog_bubble', 'js/game/Stage1/assets/dialog/dialog_bubble.png');

		game.load.spritesheet('buttons', 'js/game/Stage1/assets/buttons/buttons.png', 224, 50, 2, 1, 1);

		game.load.bitmapFont('nokia_black', 'assets/fonts/nokia16black.png', 'assets/fonts/nokia16black.xml');
		game.load.bitmapFont('nokia_white', 'assets/fonts/nokia.png', 'assets/fonts/nokia.xml');

		audio = new Audio();
		game.load.audiosprite('sfx', audio.sprite_path(), null, audio.json());

		recorder = new Recorder();
	}

	function create()
	{
		game.add.image(0, 0, 'title');
		game.add.image(0, 0, 'dialog_bubble');

		teacher = game.add.image(-415, 135, 'teacher');	
		game.add.tween(teacher).to({ x: 0 }, 3000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);

		game.add.bitmapText(350, 480, 'nokia_black', "Repeat after me.", 30);

		audio.set_fx(game.add.audioSprite('sfx'));

		game.add.bitmapText(350, 50, 'nokia_white', audio.transcription(), 30);

		make_button_listen(600, 470);
		
		make_button_record(600, 530);
	}

	function make_button_listen(x, y) 
	{
	    var button = game.add.button(x, y, 'buttons', audio.play_event, this, 0, 1, 0);

	    var text = game.add.bitmapText(x, y + 15, 'nokia_black', "> Listen", 20);
    	text.x = button.x + 50;
	}
	

	function make_button_record(x, y) 
	{
	    var button = game.add.button(x, y, 'buttons', recorder.record_event, this, 0, 1, 0);
	    button.smoothed = false;

	    var text = game.add.bitmapText(x, y + 15, 'nokia_black', "> Repeat", 20);
    	text.x = button.x + 50;
	}

	function stage_clear()
	{
		teacher = null;
		game.destroy();
		
		//CURRENT_STATE = new Stage2();
		//CURRENT_STATE.run();
	}
}