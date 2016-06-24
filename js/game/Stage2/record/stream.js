function Stream(source)
{
	var stream = source;
	var script_processor_node = null;
	var state = 'stopped';
	
	this.connect = function(here)
	{
		state = 'running';
		stream.connect(here);
	}

	this.configProcessor = function(processor)
	{
		script_processor_node = processor;
		script_processor_node.onaudioprocess = process_microphone_buffer;
		this.connect(script_processor_node);
	}

	this.playbackState = function()
	{
		return stream.playbackState;
	}

	this.playing = function()
	{
		return stream.PLAYING_STATE;
	}

	this.stop = function()
    {
    	state = 'stopped';
    }

	function process_microphone_buffer(event) 
	{
		if(state == 'running')
    	{
			var spectogram = new Spectogram();
			//spectogram.draw(event.inputBuffer.getChannelData(0));
		}
  	}
}