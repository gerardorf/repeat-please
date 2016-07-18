RECORDER_INSTANCE = null;

function Recorder(iconPosX, iconPosY) 
{	
	var evt_mng = new Event_Manager();
	var micro_acquired_evt = evt_mng.create('micro_acquired');

	var vr = new Voice_Recognizer();
	vr.listen_to_voice_detected_event(function (e) { voice_detected(); });
	vr.listen_to_voice_not_detected_event(function (e) { voice_not_detected(); });

	var icon = game.add.sprite(iconPosX, iconPosY, MICRO_NAME, MICRO_OFF);
	fade_pulse(icon);

	this.listen_to_micro_acquired_event = function(action)
	{
		evt_mng.listen(micro_acquired_evt, action);
	}

	this.listen_to_voice_recorded_event = function(action)
	{
		vr.listen_to_voice_recorded_event(action);
	}

	this.listen_to_voice_match_event = function(action)
	{
		vr.listen_to_voice_match_event(action);
	}

	this.listen_to_voice_not_match_event = function(action)
	{
		vr.listen_to_voice_not_match_event(action);
	}

	this.get_user_media = function()
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

	var sample_rate = null;
	var outputElement = document.getElementById('output');
	var outputString;
	var analyser;

	this.set_icon_at = function(x, y)
	{
		icon = game.add.sprite(x, y, MICRO_NAME, MICRO_OFF);
	}

	this.start_recording = function()
	{
		recording = true;

        // reset the buffers
        leftchannel.length = 0;
        rightchannel.length = 0;
        recording_length = 0;
	}

	this.move_icon_to = function(x, y)
	{
		icon.x = x;
		icon.y = y;
	}
	
	function success(stream)
	{
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

		evt_mng.dispatch(micro_acquired_evt);
		evt_mng.remove(micro_acquired_evt);

		icon.destroy();
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

		vr.detect_voice(analyser);

		clone_samples(stream);
	}

	function clone_samples(stream)
	{
		var left = stream.inputBuffer.getChannelData (0);
        var right = stream.inputBuffer.getChannelData (1);

        // we clone the samples
        leftchannel.push (new Float32Array (left));
        rightchannel.push (new Float32Array (right));
        recording_length += DEFAULT_BUFFER_SIZE;
	}


	//// STOP RECORDING
	this.stop_recording = function()
	{
        recording = false;

        icon.destroy();

        save_blob(data());
	}

	function save_blob(data)
	{
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

	function data()
	{
		var interleaved = interleave_channels();

        var file = new DataView(new ArrayBuffer(44 + interleaved.length * 2));

        fill(file, interleaved);

        return file;
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

	function writeUTFBytes(view, offset, string)
	{ 
		var lng = string.length;

		for (var i = 0; i < lng; i++)
		{
			view.setUint8(offset + i, string.charCodeAt(i));
		}
	}

	////VOICE RECOGNITION
	function voice_detected()
	{
		icon.frameName = MICRO_ON_DETECTION;
	}

	function voice_not_detected()
	{
		icon.frameName = MICRO_ON_NO_DETECTION; 
	}
}
