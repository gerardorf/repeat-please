game = null;

function drag(element, action)
{
	animate(element, action, null, false, false);
}

function fade_in(element)
{
	hide(element);
	animate(element, { alpha: OPAQUE },null, false, false);
}

function fade_pulse(element)
{
	element.alpha = TRANSPARENT;
	animate(element, { alpha: OPAQUE },null, true, true);
}

function fade_pulse_once(element)
{
	element.alpha = TRANSPARENT;
	animate(element, { alpha: OPAQUE }, 500, false, true);
}

function stop_fade_pulse(element)
{
	element.alpha = OPAQUE;
	animate(element, { alpha: OPAQUE },null, false, false)
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