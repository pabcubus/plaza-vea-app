app.controller('CarritoController', function($timeout, $state, lodash, SessionService, CarritoService, DataService){
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

	function changeCantidadProducto(producto){
		CarritoService.changeCantidadProducto(producto);
		vm.carrito		= CarritoService.carrito;
		vm.carritoTotal	= CarritoService.carritoTotal;
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
				navigator.notification.alert(
					'Se presento un problema de conexión, y no se pudo terminar el proceso de compra',
					null,
					'Alerta',
					'OK'
				);
			});

	}
});
