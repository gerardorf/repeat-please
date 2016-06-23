function AudioLibrary() 
{
    var audio_sprites = 'js/game/Stage1/assets/audio/audio_sprites.mp3';

    var sentences = {
        spritemap: {
            'things': {
                start: 0,
                end: 2.5,
                loop: false,
                text: "I've seen things you people wouldn't believe."
            },
            'live_long': {
                start: 2.5,
                end: 4.5,
                loop: false,
                text: "Live long and prosper."
            }
        }
    };

    this.json = function()
    {
        return sentences;
    }

    this.path = function()
    {
        return audio_sprites;
    }

    this.get_text = function(marker)
    {
        return sentences.spritemap[marker].text;
    }
};
