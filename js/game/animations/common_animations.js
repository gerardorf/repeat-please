game = null;

function drag(element, action)
{
	animate(element, action, false, false);
}

function fade_in(element)
{
	hide(element);
	animate(element, { alpha: OPAQUE }, false, false);
}

function fade_pulse(element)
{
	element.alpha = TRANSPARENT;
	animate(element, { alpha: OPAQUE }, true, true);
}

function stop_fade_pulse(element)
{
	element.alpha = OPAQUE;
	animate(element, { alpha: OPAQUE }, false, false)
}

function hide(element)
{
	element.alpha = TRANSPARENT;
}

function animate(element, action, forever, revert)
{
	game.add.tween(element).to(action, 2000, Phaser.Easing.Quadratic.Out, true, 0, forever ? -1 : 0, revert);
}