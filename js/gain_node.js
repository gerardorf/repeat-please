function Gain_Node(gain)
{
	var gain_node = gain;

	this.get = function()
	{
		return gain_node;
	}

	this.connect = function(here)
	{
		gain_node.connect(here);
	}

	this.value = function(value)
	{
		 gain_node.gain.value = value;
	}
}