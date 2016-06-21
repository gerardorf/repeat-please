function Spectogram()
{
	this.draw = function(given_typed_array)
	{
	  var size_buffer = given_typed_array.length;
	  var index = 0;
	  var max_index = 5;

	  for (; index < max_index && index < size_buffer; index += 1) 
	  {
	      log(given_typed_array[index]);
	  }
	}

	function log(text)
	{
	  document.getElementById('spectogram').innerHTML = "<p>" + text + "</p>";
	}
}