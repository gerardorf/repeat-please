function Fft(par)
{
	var node = par;

	this.node = function()
	{
		return node;
	}

	this.connect = function(here)
	{
		node.connect(here);
	}

	this.on_audio_process = function(analyser, stream)
    {
    	node.onaudioprocess = function() 
		{
			var array = new Uint8Array(analyser.frequencyBinCount());

			get_frequency_average(analyser, array);
			draw_spectogram(stream, array);
		};
    }

    function get_frequency_average(analyser, array)
    {
		analyser.getByteFrequencyData(array);
    }

    function draw_spectogram(stream, array)
    {
    	if (stream.playbackState() == stream.playing()) 
		{
			var spectogram = new Spectogram();
			spectogram.draw(array);
		}
    }
}