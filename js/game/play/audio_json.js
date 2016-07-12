function AudioLibrary()  //TODO REFACTOR
{
    var sentences_sprites = 'assets/audio/audio_sprites.ogg';

    var sentences = 
    {
        spritemap: 
        {
            'things': 
            {
                start: 0,
                end: 2.5,
                loop: false,
                text: "I've seen things you people \nwouldn't believe."
            },

            'live_long': 
            {
                start: 2.5,
                end: 4.1,
                loop: false,
                text: "Live long and prosper."
            },

            'well_done': 
            {
                start: 4.1,
                end: 5.5,
                loop: false,
                text: "Well done."
            },

            'people': 
            {
                start: 5.3,
                end: 6,
                loop: false,
                text: "PEOPLE"
            }
        }
    };

    this.path_voice = function()
    {
        return sentences_sprites;
    }

    this.voice = function()
    {
        return sentences;
    }

    this.get_text = function(marker)
    {
        return sentences.spritemap[marker].text;
    }


    var effects_sprites = 'assets/audio/sound_effects.ogg';

    var sound_effects = 
    {
        spritemap: 
        {
            'charm': 
            {
                start: 0,
                end: 3.6,
                loop: false
            },

            'final_countdown_tone':
            {
                start: 3.8,
                end: 4.8,
                loop: false
            },
            
            'normal_countdown_tone':
            {
                start: 4.84,
                end: 5.74,
                loop: false
            },

            'well_done': 
            {
                start: 5.74,
                end: 6.7,
                loop: false,
                text: "Well done."
            },

            'clock': 
            {
                start: 6.7,
                end: 7.65,
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
