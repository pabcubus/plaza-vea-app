app.controller('CompraCompletadaController', function($state, lodash, DataService, SessionService, CarritoService) {
	var vm = this;

	init();

	function init() {
		var user	= angular.copy(SessionService.user);
		var carrito = angular.copy(CarritoService.carrito);

		var jsonRequest = {
			idTienda: 'P195',
			idCliente: '' + user.dni,
			emailCliente: user.correo,
			items: []
		};

		lodash.forEach(carrito, function(prd){
			jsonRequest.items.push(
				{
					barcode: prd.ean,
					qty: prd.cantidad
				}
			);
		});

		DataService.performOperation('http://10.20.17.88:8282/api/Venta', 'POST', jsonRequest)
			.then(function(result){
				JsBarcode("#barcode", result.data.idTransaction);
				CarritoService.clearCarrito();
			})
			.catch(function(data){
				$state.go('bienvenido');
				alert('Hubo errores mientras guardaba la compra. Intente mas tarde');
			});
	}
});
