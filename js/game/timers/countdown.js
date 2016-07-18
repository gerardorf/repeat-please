function CountDown()
{
	var timer = null;

	var evt_mng = new Event_Manager();
	var update_evt = null;
	var done_evt = null;

	this.listen_update_event = function(listener, action)
	{
		update_evt = evt_mng.create('countdown_update_event_' + Math.floor((Math.random() * 100) + 1));
		evt_mng.listen(update_evt, action);
	}

	this.listen_done_event = function(listener, action)
	{
		done_evt = evt_mng.create('countdown_done_event_' + listener);
		evt_mng.listen(done_evt, action);
	}

	this.start = function()
	{
		timer = new Timer();
		timer.listen_to_tick_event('countdown', function (e) { update(); });
		timer.listen_to_timer_stopped_event('countdown', function (e) { finish(); });
		timer.start(5);
	}

	function update()
	{
		evt_mng.dispatch(update_evt);
	}

	function finish()
	{
		evt_mng.dispatch(done_evt);
		evt_mng.remove(done_evt);
		evt_mng.remove(update_evt);
	}
}