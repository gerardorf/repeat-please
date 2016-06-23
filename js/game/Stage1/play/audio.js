function Audio() 
{
	var current_sprite = 'things'; //Change this to modify the sentence to repeat.
	var fx;
	var audiolibrary = new AudioLibrary();

	this.play_event = function()
	{
	    fx.play(current_sprite);
	}

	this.sprite_path = function()
	{
		return audiolibrary.path();
	}

	this.transcription = function()
	{
		return audiolibrary.get_text(current_sprite);
	}

	this.json = function()
	{
		return audiolibrary.json();
	}

	this.set_fx = function(audio_sprite)
	{
		fx = audio_sprite;
		fx.allowMultiple = true;
	}
}