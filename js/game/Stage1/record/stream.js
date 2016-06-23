function Stream(source)
{
	var stream = source;
	var script_processor_node = null;
	
	this.connect = function(here)
	{
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

	function process_microphone_buffer(event) 
	{
		var spectogram = new Spectogram();
		spectogram.draw(event.inputBuffer.getChannelData(0));
  	}
}