function Analyser(par)
{
	var node = par;

	this.node = function()
	{
		return node;
	}

	this.config = function()
	{
		node.smoothingTimeConstant = 0;
		node.fftSize = 2048;
	}

	this.connect = function(here)
	{
		node.connect(here);
	}

	this.frequencyBinCount = function()
	{
		return node.frequencyBinCount;
	}

	this.getByteFrequencyData = function(array)
	{
		node.getByteFrequencyData(array);
	}
}