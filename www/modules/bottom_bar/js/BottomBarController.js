app.controller('BottomBarController', function($location, ProductoService) {
	var vm = this;

	vm.scan = scan;

	function scan() {
		cordova.plugins.barcodeScanner.scan(
			function(result) {
				$location('/producto/'+result.text);

				/*
				alert("We got a barcode\n" +
					"Result: " + result.text + "\n" +
					"Format: " + result.format + "\n" +
					"Cancelled: " + result.cancelled);*/

					/*
				ProductoService.getProduct(result.text)
					.then(function(producto){
						$location('/producto/'+producto.ea);
					})
					.catch(function(data){
						alert(data.message);
					});
					*/
			},
			function(error) {
				alert("Error escaneando producto");
			}, {
				preferFrontCamera: false, // iOS and Android
				torchOn: false, // Android, launch with the torch switched on (if available)
				showFlipCameraButton: true, // iOS and Android
				showTorchButton: true, // iOS and Android
				prompt: "", // Android
				resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
				formats: "EAN_13", // default: all but PDF_417 and RSS_EXPANDED
				orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
				disableAnimations: true // iOS
			}
		);
	}
});
