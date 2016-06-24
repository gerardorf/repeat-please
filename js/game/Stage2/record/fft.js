function Fft(par)
{
	var node = par;
	var state = 'stopped';

	this.node = function()
	{
		return node;
	}

	this.connect = function(here)
	{
		state = 'running';
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

    this.stop = function()
    {
    	state = 'stopped';
    }

    function get_frequency_average(analyser, array)
    {
		analyser.getByteFrequencyData(array);
    }

    function draw_spectogram(stream, array)
    {
    	if(state == 'running')
    	{
	    	if (stream.playbackState() == stream.playing()) 
			{
				var spectogram = new Spectogram();
				spectogram.draw(array);
			}
		}
    }
}