app.controller('CarritoController', function($state, CarritoService){
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
		$state.go('compra_completada');
	}
});
