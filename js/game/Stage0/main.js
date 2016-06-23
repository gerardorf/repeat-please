function Stage0()
{
	var game = null;
	var teacher = null;
	var background = null;
	var fade_back = null;
	var dialog = null;

	this.run = function()
	{
		game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });
	}

	function preload()
	{
		game.load.image('title', 'js/game/Stage0/assets/background/classroom.png');
		game.load.image('fade_background', 'js/game/Stage0/assets/background/transparent_layer.png');
		game.load.image('dialog_bubble', 'js/game/Stage0/assets/dialog/dialog_bubble.png');
		game.load.image('hello_ellen', 'js/game/Stage0/assets/characters/hello.png');

		game.load.spritesheet('buttons', 'js/game/Stage0/assets/buttons/buttons.png', 224, 50, 2, 1, 1);

		game.load.bitmapFont('nokia_black', 'assets/fonts/nokia16black.png', 'assets/fonts/nokia16black.xml');
	}

	function create()
	{
		background = game.add.image(0, 0, 'title');
		fade_back = game.add.image(0, -600, 'fade_background');

		game.add.tween(fade_back).to({ y: 0 }, 2000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);

		dialog = game.add.image(0, 0, 'dialog_bubble');
		teacher = game.add.image(0, 50, 'hello_ellen');

		game.add.tween(teacher).to({ x: 900 }, 3000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);

		game.add.bitmapText(50, 470 + 7, 'nokia_black', "Hello, I'm Ellen. Nice to meet you! Are you ready?", 30);
		make_button_start('start', "> Go!", 450, 520);
	}

	function make_button_start(name, text, x, y) 
	{
	    var button = game.add.button(x, y, 'buttons', stage_clear, this, 0, 1, 0);
	    button.name = name;
	    button.smoothed = false;

	    var text = game.add.bitmapText(x, y + 15, 'nokia_black', text, 20);
    	text.x += (button.width / 2) - (text.textWidth / 2);
	}

	function stage_clear()
	{
		teacher = null;
		background = null;
		fade_back = null;
		dialog = null;
		game.destroy();

		CURRENT_STATE = new Stage1();
		CURRENT_STATE.run();
	}
}