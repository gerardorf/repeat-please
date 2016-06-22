var fft_panel;
var first_channel_panel;

function load_record()
{
    game.load.image('audio_wave', 'assets/pics/audio_wave.png');
}

function create_record_ui()
{
    make_record_button('record', 610, 160);
    game.add.image(380, 100, 'audio_wave');

    game.add.bitmapText(200, 130 + 7, 'nokia', "FFT: ", 16);
    fft_panel = game.add.bitmapText(280, 130 + 7, 'nokia', "0.0", 16);

    game.add.bitmapText(200, 150 + 7, 'nokia', "Channel: ", 16);
    first_channel_panel = game.add.bitmapText(280, 150 + 7, 'nokia', "0.0", 16);
}

function make_record_button(name, x, y) 
{
    var button = game.add.button(x, y, 'buttons', record_event, this, 1, 1, 1);
    button.name = name;
    button.smoothed = false;
}

function record_event() 
{
   start_recording();
}