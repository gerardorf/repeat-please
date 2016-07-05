function StageNo()
{
	var game = null;

	this.run = function()
	{
		game = new Phaser.Game(1200, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });
	}

	function preload()
	{
		game.load.image('title', 'backgroundimage');
		game.load.spritesheet('buttons', 'buttonsspritesheet', spritewith, spriteheigh, hover, normal, click);
		game.load.bitmapFont('nokia', 'font.png', 'font.xml');
	}

	function create()
	{
		game.add.image(0, 0, 'title');
		game.add.bitmapText(x, y, 'nokia', text, 30);
		game.add.button(x, y, 'buttons', finish_stage, this, 0, 1, 0);
	    button.name = name;
	    button.smoothed = false;
	}

	function stage_clear()
	{
		game.destroy();

		CURRENT_STATE = new NextStage();
		CURRENT_STATE.run();
	}
}