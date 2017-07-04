app.controller('BottomBarController', function($rootScope, $state, CarritoService) {
	var vm = this;

	vm.carritoItems = 0;

	vm.scan = scan;

	$rootScope.$watch(
		function() {
			return CarritoService.carrito.length;
		},
		function() {
			vm.carritoItems = CarritoService.carrito.length;
		}
	);

	function scan() {

		/*
		$state.go('producto', {
			'ean': '123456'
		});
		*/

		cordova.plugins.barcodeScanner.scan(
			function(result) {
				$state.go('producto', {
					'ean': result.text
				});
			},
			function(error) {
			},
			{
				preferFrontCamera: false, // iOS and Android
				torchOn: false, // Android, launch with the torch switched on (if available)
				showFlipCameraButton: false, // iOS and Android
				showTorchButton: true, // iOS and Android
				prompt: "", // Android
				resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
				formats: "EAN_13", // default: all but PDF_417 and RSS_EXPANDED
				orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
				disableAnimations: true // iOS
			}
		);
	}
});
