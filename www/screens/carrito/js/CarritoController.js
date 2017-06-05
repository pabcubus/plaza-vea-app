app.controller('CarritoController', function($timeout, $state, lodash, SessionService, CarritoService){
	var vm = this;

	vm.currentProducto		= {};
	vm.carrito				= [];
	vm.carritoTotal			= 0;

	vm.removeProducto			= removeProducto;
	vm.terminarCompra			= terminarCompra;
	vm.changeCantidadProducto	= changeCantidadProducto;

	init();

	function init(){
		vm.carrito		= CarritoService.carrito;
		vm.carritoTotal	= CarritoService.carritoTotal;
	}

	function removeProducto(producto){
		CarritoService.removeProducto(angular.copy(producto));
		vm.carrito		= CarritoService.carrito;
		vm.carritoTotal	= CarritoService.carritoTotal;
	}

	function changeCantidadProducto(){
		CarritoService.calcularTotalCarrito();
		vm.carrito		= CarritoService.carrito;
		vm.carritoTotal	= CarritoService.carritoTotal;
	}

	function terminarCompra(){
		var user	= angular.copy(SessionService.user);

		CarritoService.terminarCompra(user.dni, angular.copy(vm.carrito))
			.then(function(result){
				$state.go('compra_completada');

				$timeout(function(){
					JsBarcode("#barcode", result.idTransaction);
					CarritoService.clearCarrito();
				}, 500);
			})
			.catch(function(){
				navigator.notification.alert(
					'Se presento un problema de conexión, y no se pudo terminar el proceso de compra',
					null,
					'Alerta',
					'OK'
				);
			});
	}
});
