function AudioLibrary()  //TODO REFACTOR
{
    var sentences_sprites = 'assets/audio/audio_sprites.mp3';

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

    this.path_sentences = function()
    {
        return sentences_sprites;
    }

    this.sentences = function()
    {
        return sentences;
    }

    this.get_text = function(marker)
    {
        return sentences.spritemap[marker].text;
    }


    var effects_sprites = 'assets/audio/splitted/charm.mp3';

    var sound_effects = {
        spritemap: {
            'charm': {
                start: 0,
                end: 2.5,
                loop: false
            }
        }
    };  

    this.path_effects = function()
    {
        return effects_sprites;
    }

    this.sound_effects = function()
    {
        return sound_effects;
    }
};
