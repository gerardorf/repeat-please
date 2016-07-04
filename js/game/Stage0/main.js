function Stage0()
{
	var game = null;
	var teacher = null;
	var background = null;
	var fade_back = null;
	var dialog = null;
	var welcome_text = null;
	var button = null;
	var button_text = null;

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
		load_assets();
		animate();
	}

	function load_assets()
	{
		background = game.add.image(0, 0, 'title');
		fade_back = game.add.image(0, -600, 'fade_background');
		dialog = game.add.image(0, 0, 'dialog_bubble');
		dialog.alpha = 0;

		welcome_text = game.add.bitmapText(350, 60, 'nokia_black', 
			"Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit. " +
			"\n\nPraesent efficitur ante sit amet \nmattis auctor. Fusce vehicula eu \ndolor ac posuere. Etiam dapibus \nsapien nibh, at pellentesque lectus \nmalesuada sed. " +
			"\n\nVivamus ultricies sapien nec \npulvinar ultricies. Maecenas id\nauctor est. Aliquam ut fermentum \neros, in dapibus elit.", 30);
		welcome_text.alpha = 0;

		make_button('start', "> Vamos allá!!", 490, 480);

		teacher = game.add.image(0, 50, 'hello_ellen');
	}

	function make_button(name, text, x, y) 
	{
	    button = game.add.button(x, y, 'buttons', stage_clear, this, 0, 1, 0);
	    button.name = name;
	    button.smoothed = false;
	   	button.alpha = 0;

	    button_text = game.add.bitmapText(x, y + 15, 'nokia_black', text, 20);
    	button_text.x += (button.width / 2) - (button_text.textWidth / 2);
    	button_text.alpha = 0;
	}

	function animate()
	{
		game.add.tween(fade_back).to({ y: 0 }, 2000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
		game.add.tween(dialog).to( { alpha: 1 }, 3000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
		game.add.tween(welcome_text).to({ alpha: 1 }, 3000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
		game.add.tween(button).to({ alpha: 1 }, 3000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
		game.add.tween(button_text).to({ alpha: 1 }, 3000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
		game.add.tween(teacher).to({ x: 800 }, 3000, Phaser.Easing.Quadratic.Out, true, 0, 0, false);
	}

	function stage_clear()
	{
		teacher = null;
		background = null;
		fade_back = null;
		dialog = null;
		button_text = null;
		button = null;
		welcome_text = null;

		game.destroy();

		CURRENT_STATE = new Stage1();
		CURRENT_STATE.run();
	}
}