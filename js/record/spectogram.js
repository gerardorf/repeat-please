function Spectogram()
{
	this.draw = function(array, panel)
	{
	  var max_index = 5;

	  for (var index = 0; index < max_index && index < array.length; index += 1) 
	  {
	      log(array[index].toFixed(5), panel);
	  }
	}

	function log(text, panel)
	{	
		switch(panel) {
		    case "fft":
		        fft_panel.destroy();
		        fft_panel = game.add.bitmapText(280, 130 + 7, 'nokia', text, 16);
		        break;
		    case "first_channel":
		        first_channel_panel.destroy();
		        first_channel_panel = game.add.bitmapText(280, 150 + 7, 'nokia', text, 16);
		        break;
		}
	}
}