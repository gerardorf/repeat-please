function Spectogram()
{
	this.draw = function(array)
	{
	  var max_index = 5;

	  for (var index = 0; index < max_index && index < array.length; index += 1) 
	  {
	      console.log(array[index].toFixed(5));
	  }
	}
}