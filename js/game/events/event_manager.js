function Event_Manager()
{
	this.create = function(event_name)
	{
		var event = document.createEvent('Event');
		event.name = event_name;
		event.initEvent(event.name, true, true);

		return event;
	}

	this.listen = function(event, action) //function (e) { action(); }
	{
		document.addEventListener(event.name, action);
	}

	this.dispatch = function(event)
	{
		document.dispatchEvent(event);
	}

	this.remove = function(event, action)
	{
		document.removeEventListener(event.name, action);
		event = null;
	}
}
