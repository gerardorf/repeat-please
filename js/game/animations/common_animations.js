game = null;
CURRENT_STAGE = null;

function drag(element, action)
{
	animate(element, action, null, false, false);
}

function fade_in(element)
{
	hide(element);
	animate(element, { alpha: OPAQUE },null, false, false);
}

function fade_pulse(element, speed = null)
{
	element.alpha = TRANSPARENT;
	animate(element, { alpha: OPAQUE }, speed, true, true);
}

function fade_pulse_once(element)
{
	element.alpha = TRANSPARENT;
	animate(element, { alpha: OPAQUE }, 500, false, true);
}

function stop_fade_pulse(element)
{
	element.alpha = OPAQUE;
	animate(element, { alpha: OPAQUE }, null, false, false)
}

function hide(element)
{
	element.alpha = TRANSPARENT;
}

function show(element)
{
	element.alpha = OPAQUE;
}

function animate(element, action, speed = 2000, forever, revert)
{
	game.add.tween(element).to(action, speed, Phaser.Easing.Quadratic.Out, true, 0, forever ? -1 : 0, revert);
}

function stage_clear()
{
	game.destroy();
	next_stage();
}

function next_stage()
{
	CURRENT_STAGE = new Stage1();
	CURRENT_STAGE.run();
}

function random_repeat_frame()
{
	if((Math.floor(Math.random() * 3)) == 0)
	{
		return TEACHER_YOUR_TURN;
	}
	else
	{
		return TEACHER_ONE_LAST_TIME;
	}
}