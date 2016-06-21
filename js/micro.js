function Micro(audioContext)
{
	var script_processor_fft_node = null;
	var analyserNode = null;
	var audioContext = audioContext;
	var gain_node = null;
	var stream = null;
	var BUFF_SIZE = 16384;

    this.config = function(streamPar)
    {
    	set_gain_node();
    	set_stream(streamPar);
		setup_fft();
    }

    function set_gain_node()
    {
    	gain_node = new Gain_Node(audioContext.createGain());
		gain_node.connect(audioContext.destination);
    }

    function set_stream(streamPar)
    {
    	stream = new Stream(audioContext.createMediaStreamSource(streamPar));
		stream.connect(gain_node.get()); 
		stream.configProcessor(audioContext.createScriptProcessor(BUFF_SIZE, 1, 1));
    }

    function setup_fft()	//TODO: Extract
    {
		script_processor_fft_node = audioContext.createScriptProcessor(2048, 1, 1);
		script_processor_fft_node.connect(gain_node.get());

		analyserNode = audioContext.createAnalyser();
		analyserNode.smoothingTimeConstant = 0;
		analyserNode.fftSize = 2048;

		stream.connect(analyserNode);

		analyserNode.connect(script_processor_fft_node);

		script_processor_fft_node.onaudioprocess = function() 
		{
			// get the average for the first channel
			var array = new Uint8Array(analyserNode.frequencyBinCount);
			analyserNode.getByteFrequencyData(array);

			// draw the spectrogram
			if (stream.playbackState() == stream.playing()) 
			{
			    show_some_data(array, 5, "from fft");
			}
		};
    }

	//TODO: Extract
	function log(text)
	{
	  document.getElementById('consola').innerHTML += "<p>" + text + "</p>";
	}

	function show_some_data(given_typed_array, num_row_to_display, label) {
	  var size_buffer = given_typed_array.length;
	  var index = 0;
	  var max_index = num_row_to_display;

	  log("__________ " + label);

	  for (; index < max_index && index < size_buffer; index += 1) {

	      log(given_typed_array[index]);
	  }
	}
}