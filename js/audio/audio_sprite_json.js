var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

var audioJSON = {
    spritemap: {
        'things': {
            start: 0,
            end: 3,
            loop: false
        }
    }
};

function preload() 
{
    game.load.image('title', 'assets/pics/background.png');
    game.load.image('recording', 'assets/pics/recording.png');

    game.load.spritesheet('button', 'assets/buttons/listen.png', 80, 20);
    game.load.spritesheet('button', 'assets/buttons/repeat.png', 80, 20);
    game.load.bitmapFont('nokia', 'assets/fonts/nokia.png', 'assets/fonts/nokia.xml');
    game.load.audiosprite('sfx', 'assets/audio/things.ogg', null, audioJSON);

}

var fx;

function create() 
{
	game.add.image(0, 0, 'title');

	//Here we set-up our audio sprite
	fx = game.add.audioSprite('sfx');
    fx.allowMultiple = true;

	makeListenButton('things', 'Listen', 610, 50);
    var text = game.add.bitmapText(200, 50 + 7, 'nokia', "I've seen things you people wouldn't believe.", 16);

    makeRecordButton('things', 'Record', 610, 160);
    game.add.image(380, 100, 'recording');
}

function makeListenButton(name, buttext, x, y) 
{
    var button = game.add.button(x, y, 'button', listen, this, 0, 1, 2);
    button.name = name;
    button.scale.set(2, 1.5);
    button.smoothed = false;

    var text = game.add.bitmapText(x, y + 7, 'nokia', buttext, 16);
    text.x += (button.width / 2) - (text.textWidth / 2);
}

function listen(button) 
{
	fx.play(button.name);
}

function makeRecordButton(name, buttext, x, y) 
{
    var button = game.add.button(x, y, 'button', record, this, 0, 1, 2);
    button.name = name;
    button.scale.set(2, 1.5);
    button.smoothed = false;

    var text = game.add.bitmapText(x, y + 7, 'nokia', buttext, 16);
    text.x += (button.width / 2) - (text.textWidth / 2);
}

function record() 
{
   start_recording();
}