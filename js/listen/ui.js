var fx;

function load_listen()
{
    var audiolibrary = new AudioLibrary();
    game.load.audiosprite('sfx', 'assets/audio/audio_sprites.mp3', null, audiolibrary.json());
}

function create_listen_ui()
{
    set_audio_sprite();

    make_listen_button('things', 610, 50);
    var text = game.add.bitmapText(200, 50 + 7, 'nokia', "I've seen things you people wouldn't believe.", 16);

    make_listen_button('live_long', 610, 10);
    var text = game.add.bitmapText(200, 10 + 7, 'nokia', "Live long and prosper.", 16);
}

function set_audio_sprite()
{
    fx = game.add.audioSprite('sfx');
    fx.allowMultiple = true;
}

function make_listen_button(name, x, y) 
{
    var button = game.add.button(x, y, 'buttons', listen_event, this, 0, 0, 0);
    button.name = name;
    button.smoothed = false;
}

function listen_event(button) 
{
    fx.play(button.name);
}