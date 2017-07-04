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
		setCarritoData();
		vm.selectCantidad	= [];
		for (var i = 1; i <= 20; i++){
			vm.selectCantidad.push(i);
		}
	}

	function removeProducto(producto){
		CarritoService.removeProducto(angular.copy(producto));
		setCarritoData();
	}

	function changeCantidadProducto(producto){
		CarritoService.calcularTotalCarrito();
		setCarritoData();
	}

	function terminarCompra(){
		var user	= angular.copy(SessionService.user);

		CarritoService.terminarCompra(user.id, angular.copy(vm.carrito))
			.then(function(result){
				$state.go('compra_completada');

				$timeout(function(){
					CarritoService.clearCarrito();
				}, 500);
			})
			.catch(function(data){
				$state.go(CarritoService.carrito.length > 0 ? 'carrito' : 'bienvenido');
				$timeout(function(){
					navigator.notification.alert(
						lodash.has(data, 'codError') ? data.messageError : 'Se presento un problema de conexión, y no se pudo leer el producto',
						null,
						'Alerta',
						'OK'
					);
				}, 500);
			});
	}

	function setCarritoData(){
		vm.carrito				= CarritoService.carrito;
		vm.carritoTotal			= CarritoService.carritoTotal;
		vm.carritoTotalString	= CarritoService.carritoTotalString;
	}
});
