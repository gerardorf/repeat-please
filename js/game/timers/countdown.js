function CountDown()
{
	var timer = new Timer();

	var update_evt = null;
	var done_evt = null;

	this.listen_update_event = function(listener, action)
	{
		update_evt = new Event('countdown_update_event_' + listener + Math.floor((Math.random() * 100) + 1));
		update_evt.add_listener(action);
	}

	this.listen_done_event = function(listener, action)
	{
		done_evt = new Event('countdown_done_event_' + listener + Math.floor((Math.random() * 100) + 1));
		done_evt.add_listener(action);
	}

	this.start = function()
	{
		timer.listen_to_tick_event('countdown', update);
		timer.listen_to_timer_stopped_event('countdown', finish);
		timer.start(5);
	}

	function update()
	{
		update_evt.dispatch();
	}

	function finish()
	{
		timer.destroy();
		done_evt.dispatch();
		done_evt.remove();
		update_evt.remove();
	}

	this.destroy = function()
	{
		timer.destroy();
		done_evt.remove();
		update_evt.remove();
	}
}