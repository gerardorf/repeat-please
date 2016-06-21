function Microphone(audioContext)
{
	var audioContext = audioContext;

	var stream = null;

	var gain = null;
	var fft = null;
	var analyser = null;
	
    this.config = function(streamPar)
    {
    	create_gain_node();
    	create_stream(streamPar);
		create_fft();
		create_analyser();
		
		fft.on_audio_process(analyser, stream);
		stream.connect(analyser.node());
		analyser.connect(fft.node());
    }

    function create_gain_node()
    {
    	gain = new Gain(audioContext.createGain());
		gain.connect(audioContext.destination);
    }

    function create_stream(streamPar)
    {
    	stream = new Stream(audioContext.createMediaStreamSource(streamPar));
		stream.connect(gain.node()); 
		stream.configProcessor(audioContext.createScriptProcessor(16384, 1, 1));
    }

    function create_fft()
    {
    	fft = new Fft(audioContext.createScriptProcessor(2048, 1, 1));
    	fft.connect(gain.node());
    }

    function create_analyser()
    {
    	analyser = new Analyser(audioContext.createAnalyser());
		analyser.config();
    }
}