$("#getButton").click(
	function() {
		
		window.close();
		URLList.get();
		
	}
);

$("#setButton").click(
	function() {
		
		URLList.set(document.getElementById("mode").checked);
		window.close();
		
	}
);
