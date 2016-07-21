function Stage1()
{
	var countdown_control = null;

	var sounds = null;
	var NORMAL_COUNTDOWN_TONE = 'normal_countdown_tone';
	var FINAL_COUNTDOWN_TONE = 'final_countdown_tone';

	var countdown_model = null;

	var sound_effects = 'sound_effects';
	var sound_effects_fx = null;

	//PRELOAD
	this.run = function()
	{
		game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.CANVAS, S1_NAME, { preload: preload, create: create });
	}

	function preload()
	{
		game.load.atlas(BACKGROUND_NAME, BACKGROUND_PATH, BACKGROUND_ATLAS);
		game.load.atlas(TIMER_NAME, TIMER_PATH, TIMER_ATLAS);

		game.load.audiosprite(sound_effects, SOUND_EFFECTS_ATLAS, null, SOUNDEFFECTSJSON.get());
	}

	//CREATE
	function create()
	{
		load_sounds();
		load_background();
		run_countdown();
	}

	function load_sounds()
	{
		sound_effects_fx = game.add.audioSprite(sound_effects);
	}

	function load_background()
	{
		game.add.sprite(BACKGROUND_POSITION_X, BACKGROUND_POSITION_Y, BACKGROUND_NAME, BACKGROUND_BLACKBOARD_NAME);
	}

	function run_countdown()
	{
		var countdown_model = new CountDown();
		countdown_model.listen_update_event('s1_main', function (e) { update_animation(); });
		countdown_model.listen_done_event('s1_main', function (e) { stage_clear(); });
		countdown_model.start();
	}

	function update_animation()
	{
		if(countdown_control == null)
		{
			next(COUNTDOWN_3_NAME, NORMAL_COUNTDOWN_TONE);
		}
		else if(countdown_control.frameName == COUNTDOWN_3_NAME)
		{
			next(COUNTDOWN_2_NAME, NORMAL_COUNTDOWN_TONE);
		}
		else if(countdown_control.frameName == COUNTDOWN_2_NAME)
		{
			next(COUNTDOWN_1_NAME, NORMAL_COUNTDOWN_TONE);
		} 
		else if(countdown_control.frameName == COUNTDOWN_1_NAME) 
		{
			countdown_control.x = SCREEN_WIDTH / 7;
			next(COUNTDOWN_GO_NAME, FINAL_COUNTDOWN_TONE);
		}
	}

	function next(frame_name, sound_sprite)
	{
		if(countdown_control == null) 
		{
			countdown_control = game.add.sprite(COUNTDOWN_ANIMATION_X, COUNTDOWN_ANIMATION_Y, TIMER_NAME, frame_name);
		}
		else
		{
			countdown_control.frameName = frame_name;
		}
		
		fade_pulse_once(countdown_control);
		sound_effects_fx.play(sound_sprite);
	}
}