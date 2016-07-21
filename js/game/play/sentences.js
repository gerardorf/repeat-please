SENTENCESJSON = new SentencesJson();

function SentencesJson()
{
    var json = 
    {
        spritemap: 
        {
            'things': 
            {
                start: 0,
                end: 2.5,
                text: 'I\'ve seen things you people \nwouldn\'t believe.',
                keyword: 'people'
            },

            'live_long': 
            {
                start: 2.5,
                end: 4.1,
                text: 'Live long and prosper.',
                keyword: 'prosper'
            }
        }
    };

    this.get = function()
    {
        return json;
    }
}