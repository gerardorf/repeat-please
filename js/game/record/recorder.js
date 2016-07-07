function Recorder(iconPosX, iconPosY) 
{
	var micro_shared = false;

	var icon = game.add.sprite(iconPosX, iconPosY, MICRO_NAME, MICRO_OFF);
	fade_pulse(icon);

	var done = null;

	this.done_event = function(event_name)
	{
		done = document.createEvent('Event');
		done.name = event_name;
		done.initEvent(done.name, true, true);

		return done.name;
	}

	function get_user_media()
	{
		if (!navigator.getUserMedia)
		{
			navigator.getUserMedia = 	navigator.getUserMedia 
										|| navigator.webkitGetUserMedia 
										|| navigator.mozGetUserMedia 
										|| navigator.msGetUserMedia;
		}

		if (navigator.getUserMedia)
		{
		    navigator.getUserMedia(	{audio:true}, 
	    							success, 
	    							function(e) 
	    							{ 
	    								micro_shared = false; 
	    								alert('Please share your microphone to continue.'); 
	    							});
		} 
		else
		{
			alert('getUserMedia not supported in this browser.');
		}
	}

	//// START RECORDING
	var recording = false;
	var leftchannel = [];
	var rightchannel = [];
	var recording_length = 0;
	var timer = null;

	this.start_recording = function()
	{
		if(!micro_shared) get_user_media();
		try_record();
	}

	function try_record()
	{
		if(micro_shared)
		{
			waiting_for_media = false;
			recording = true;

	        // reset the buffers
	        leftchannel.length = 0;
	        rightchannel.length = 0;
	        recording_length = 0;
	        start_timer();
		}
		else
		{
			waiting_for_media = true;
		}
	}

	var record_timer_stopped_event = null;
	function start_timer()
	{
		timer = new Timer();
		
		record_timer_stopped_event = document.addEventListener(timer.timer_stopped_event('record_timer_stopped_event'), function (e) { stop_recording(); }, false);

		timer.start_timer(5, false);
	}

	var sample_rate = null;
	var outputElement = document.getElementById('output');
	var outputString;
	var analyser;
	var waiting_for_media = true;

	function success(stream)
	{
		micro_shared = true;

		if(waiting_for_media) try_record();

	    var context = create_context();
	    var gain_node = context.createGain();
	    window.audio_input = context.createMediaStreamSource(stream);
	    var recorder = setup_recorder(context, stream);

	    analyser = context.createAnalyser();
	    analyser.smoothingTimeConstant = 0.3;
    	analyser.fftSize = 1024;
    	audio_input.connect(analyser);
    	analyser.connect(recorder);

	    audio_input.connect(gain_node);
	    gain_node.connect (recorder);
	    recorder.connect (context.destination);
	}

	function create_context()
	{
		var audioContext = window.AudioContext || window.webkitAudioContext;
	    var new_context = new audioContext();
	    sample_rate = new_context.sampleRate;

	    return new_context;
	}

	function setup_recorder(context, stream)
	{
		var recorder = context.createScriptProcessor(DEFAULT_BUFFER_SIZE, 2, 2);

		recorder.onaudioprocess = function(stream) { record(stream); };

	    return recorder;
	}

	function record(stream)
	{
		if (!recording) return;

		stop_fade_pulse(icon);
		detect_voice();
		clone_samples(stream);
	}

	////VOICE RECOGNITION
	function detect_voice()
	{
		var array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var values = 0;
        var length = array.length;

        for (var i = 0; i < length; i++) 
        {
            values += array[i];
        }

        var average = values / length;

        if(average > 10)
        {
        	voice_detected();
        }
        else if(average <= 10 )
        {
        	voice_not_detected();
        }
	}

	function voice_detected()
	{
		icon.frameName = MICRO_ON_DETECTION;
	}

	function voice_not_detected()
	{
		icon.frameName = MICRO_ON_NO_DETECTION; 
	}
	////VOICE RECOGNITION

	function clone_samples(stream)
	{
		var left = stream.inputBuffer.getChannelData (0);
        var right = stream.inputBuffer.getChannelData (1);

        // we clone the samples
        leftchannel.push (new Float32Array (left));
        rightchannel.push (new Float32Array (right));
        recording_length += DEFAULT_BUFFER_SIZE;
	}

	//// START RECORDING

	//// STOP RECORDING
	var blob_generated = false;

	function stop_recording()
	{
		game.time.events.remove(record_timer_stopped_event);
        recording = false;
        icon.destroy();
        if(!blob_generated) save_blob(data());
        document.dispatchEvent(done);
	}

	this.force_stop = function()
	{
		stop_recording();
	}

	function interleave_channels()
	{
		// Flat the left and right channels down
        var left_buffer = mergeBuffers(leftchannel);
        var right_buffer = mergeBuffers(rightchannel);

        //Interleave channels
        return interleave(left_buffer, right_buffer);
	}

	function mergeBuffers(channel_buffer)
	{
		var result = new Float32Array(recording_length);
		var offset = 0;
		var lng = channel_buffer.length;

		for (var i = 0; i < lng; i++)
		{
			var buffer = channel_buffer[i];
			result.set(buffer, offset);
			offset += buffer.length;
		}

		return result;
	}

	function interleave(left_buffer, right_buffer)
	{
		var length = left_buffer.length + right_buffer.length;
		var result = new Float32Array(length);
		var input_index = 0;

		for (var index = 0; index < length; )
		{
			result[index++] = left_buffer[input_index];
			result[index++] = right_buffer[input_index];
			input_index++;
		}

		return result;
	}

	function data()
	{
		var interleaved = interleave_channels();

        var file = new DataView(new ArrayBuffer(44 + interleaved.length * 2));

        fill(file, interleaved);

        return file;
	}

	function fill(data, interleaved)
	{
		// RIFF chunk descriptor
        writeUTFBytes(data, 0, 'RIFF');
        data.setUint32(4, 44 + interleaved.length * 2, true);
        writeUTFBytes(data, 8, 'WAVE');
        
        // FMT sub-chunk
        writeUTFBytes(data, 12, 'fmt ');
        data.setUint32(16, 16, true);
        data.setUint16(20, 1, true);
        
        // stereo (2 channels)
        data.setUint16(22, 2, true);
        data.setUint32(24, sample_rate, true);
        data.setUint32(28, sample_rate * 4, true);
        data.setUint16(32, 4, true);
        data.setUint16(34, 16, true);

        // data sub-chunk
        writeUTFBytes(data, 36, 'data');
        data.setUint32(40, interleaved.length * 2, true);
        
        // write the PCM samples
        var lng = interleaved.length;
        var index = 44;
        var volume = 1;
        for (var i = 0; i < lng; i++)
        {
            data.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
            index += 2;
        }
	}

	function save_blob(data)
	{
		blob_generated = true;

		var blob = new Blob ( [ data ], { type : 'audio/wav' } );
		var url = (window.URL || window.webkitURL).createObjectURL(blob);

		if(DEBUG)
		{
			//SAVE MANUALLY ON LOCAL
	        var link = window.document.createElement('a');
	        document.body.appendChild(link);
	        link.id = "stream";
	        link.href = url;
	        link.download = 'output.wav';
			link.click();
		}
		else
		{
			//SEND TO SERVER
		}
	}

	function writeUTFBytes(view, offset, string)
	{ 
		var lng = string.length;

		for (var i = 0; i < lng; i++)
		{
			view.setUint8(offset + i, string.charCodeAt(i));
		}
	}
	//// STOP RECORDING
}
