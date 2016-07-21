KEYWORDSJSON = new KeywordsJson();

function KeywordsJson()
{
	var json =
    {
        spritemap:
        {
            'people': 
            {
                start: 5.3,
                end: 5.8,
                text: '\"PEOPLE\"',
                hint: 'people_like_apple'
            },

            'people_like_apple': 
            {
                start: 5.8,
                end: 10,
                text: '\"PEOPLE\" like \"APPLE\"',
                hint: ''
            }
        }
    }

    this.get = function()
    {
        return json;
    }
}