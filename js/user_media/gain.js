function Gain(par)
{
	var node = par;

	this.node = function()
	{
		return node;
	}

	this.connect = function(here)
	{
		node.connect(here);
	}

	this.value = function(value)
	{
		 node.gain.value = value;
	}
}