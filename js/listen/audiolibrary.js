function AudioLibrary() 
{
    var sentences = {
        spritemap: {
            'things': {
                start: 0,
                end: 2.5,
                loop: false
            },
            'live_long': {
                start: 2.5,
                end: 4.5,
                loop: false
            }
        }
    };

    this.json = function()
    {
        return sentences;
    }
};
