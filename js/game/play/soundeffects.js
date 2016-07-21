SOUNDEFFECTSJSON = new SoundEffectsJson();

function SoundEffectsJson()
{
	var json = 
    {
        spritemap: 
        {
            'charm': 
            {
                start: 0,
                end: 3.6
            },

            'final_countdown_tone':
            {
                start: 3.8,
                end: 4.9
            },
            
            'normal_countdown_tone':
            {
                start: 4.9,
                end: 5.7
            },

            'well_done': 
            {
                start: 5.74,
                end: 6.7
            },

            'clock': 
            {
                start: 6.7,
                end: 7.65
            },

            'repeat': 
            {
                start: 7.7,
                end: 9
            }
        }
    };

    this.get = function()
    {
        return json;
    }
}