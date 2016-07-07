function play_sound(library, sound_name)
{
	library.set_current_sprite(sound_name);
	library.play_event();
}

function Audio() //TODO REFACTOR
{
	var current_sprite; //Change this to modify the sentence to repeat.
	var fx;
	var audiolibrary = new AudioLibrary();

	this.set_current_sprite = function(sprite)
	{
		current_sprite = sprite;
	}

	this.play_event = function()
	{
	    fx.play(current_sprite);
	}

	this.path_sentences = function()
	{
		return audiolibrary.path_sentences();
	}

	this.path_effects = function()
	{
		return audiolibrary.path_effects();
	}

	this.transcription = function()
	{
		return audiolibrary.get_text(current_sprite);
	}

	this.sentences = function()
	{
		return audiolibrary.sentences();
	}

	this.sound_effects = function()
	{
		return audiolibrary.sound_effects();
	}

	this.set_fx = function(audio_sprite, default_sprite)
	{
		fx = audio_sprite;
		fx.allowMultiple = true;
		fx.autoplay = true;

		current_sprite = default_sprite;
	}
}