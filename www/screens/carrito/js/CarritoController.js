app.controller('CarritoController', function($timeout, $state, lodash, SessionService, CarritoService, DataService){
	var vm = this;

	vm.currentProducto	= {};
	vm.carrito = [];

	vm.removeProducto	= removeProducto;
	vm.terminarCompra	= terminarCompra;

	init();

	function init(){
		vm.carrito = CarritoService.carrito;
	}

	function removeProducto(producto){
		CarritoService.removeProducto(angular.copy(producto));
		vm.carrito = CarritoService.carrito;
	}

	function terminarCompra(){
		var user	= angular.copy(SessionService.user);

		var jsonRequest = {
			idTienda: 'P195',
			idCliente: '' + user.dni,
			emailCliente: user.correo,
			items: []
		};

		lodash.forEach(vm.carrito, function(prd){
			jsonRequest.items.push(
				{
					barcode: prd.ean,
					qty: prd.cantidad
				}
			);
		});

		DataService.performOperation('http://10.20.17.88:8282/api/Venta', 'POST', jsonRequest)
			.then(function(result){
				$state.go('compra_completada');

				$timeout(function(){
					JsBarcode("#barcode", result.data.idTransaction);
					CarritoService.clearCarrito();
				}, 500);
			})
			.catch(function(data){
				alert('Se presento un problema de conexión, y no se pudo terminar el proceso de compra');
			});

	}
});
