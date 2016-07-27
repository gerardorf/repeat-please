function Event(event_name)
{
	var event = null;
	var callback = null;

	create(event_name);

	function create(event_name)
	{
		event = document.createEvent('Event');
		event.name = event_name;
		event.initEvent(event.name, true, true);
	}

	this.add_listener = function(callbackP)
	{
		callback = callbackP;
		document.addEventListener(event.name, callback);
	}

	this.dispatch = function()
	{
		document.dispatchEvent(event);
	}

	this.remove = function()
	{
		document.removeEventListener(event.name, callback);
	}
}