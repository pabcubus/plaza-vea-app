app.controller('CompraCompletadaController', function(CarritoService) {
	var vm = this;

	vm.compraTransaccion = CarritoService.compraTransaccion;
});
