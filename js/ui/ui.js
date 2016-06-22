var game = new Phaser.Game(1134, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() 
{
    load_common();
    load_listen();
    load_record();
}

function load_common()
{
   	game.load.image('title', 'assets/pics/background.png');
    game.load.bitmapFont('nokia', 'assets/fonts/nokia.png', 'assets/fonts/nokia.xml');
    game.load.spritesheet('buttons', 'assets/buttons/buttons_atlas.png', 21, 20, 2, 1, 1);
}

function create() 
{
    game.add.image(0, 0, 'title');

    create_listen_ui();
    create_record_ui();
}