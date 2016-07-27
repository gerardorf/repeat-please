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

function fade_out(element)
{
	animate(element, { alpha: TRANSPARENT },null, false, false);
}

function fade_pulse(element, speed = null)
{
	element.alpha = TRANSPARENT;
	animate(element, { alpha: OPAQUE }, speed, true, true);
}

function fade_pulse_once(element, revert = true)
{
	element.alpha = TRANSPARENT;
	animate(element, { alpha: OPAQUE }, 500, false, revert);
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

function restart_activity()
{
	CURRENT_STAGE.number = 0;
	stage_clear();
}

function restart_all()
{
	CURRENT_STAGE.number = -1;
	stage_clear();
}

function stage_clear()
{
	game.destroy();
	next_stage();
}

function next_stage()
{
	if(CURRENT_STAGE == null || CURRENT_STAGE.number == -1)
	{
		CURRENT_STAGE = new Stage0();
		CURRENT_STAGE.number = 0;
	}
	else if(CURRENT_STAGE.number == 0)
	{
		CURRENT_STAGE = new Stage1();
		CURRENT_STAGE.number = 1;
	}
	else if(CURRENT_STAGE.number == 1)
	{
		CURRENT_STAGE = new Stage2();
		CURRENT_STAGE.number = 2;
	}
	else if(CURRENT_STAGE.number == 2)
	{
		CURRENT_STAGE = new Last_Stage();
		CURRENT_STAGE.number = 3;
	}

	CURRENT_STAGE.run();
}

function make_button(x, y, text, action)
{
	var button = game.add.button(x, y, BUTTONS_SPRITESHEET, action, this, 0, 1, 0);
	button.content = game.add.bitmapText(x, y + 15, BUTTONS_FONT, DEFAULT_BUTTON_CONTENT + text, BUTTONS_FONT_SIZE);
	button.content.x = button.x + 50;

	return button;
}