app.controller('CompraCompletadaController', function() {
	var vm = this;

	init();

	function init() {
		JsBarcode("#barcode", "0654321");
	}
});
