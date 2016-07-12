function Event_Manager()
{
	this.create = function(event_name, action)
	{
		var event = document.createEvent('Event');
		event.name = event_name;
		event.initEvent(event.name, true, true);

		return event;
	}

	this.listen = function(event, action) //function (e) { action(); }
	{
		document.addEventListener(event.name, action, false);
	}

	this.dispatch = function(event)
	{
		document.dispatchEvent(event);
	}

	this.remove = function(event)
	{
		game.time.events.remove(event);
	}
}
