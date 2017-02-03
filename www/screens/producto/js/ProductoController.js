app.controller('ProductoController', function($state, $stateParams, ProductoService, CarritoService){
	var vm = this;

	vm.ean			= $stateParams.ean;
	vm.producto		= {};

	vm.addProducto	= addProducto;

	init();

	function init(){
		var codigoinicial 		= vm.ean.substring(0, 2);
		var codigoproducto 		= vm.ean.substring(2, 7);
		var peso 				= vm.ean.substring(7, 12);
		var codigoverificacion 	= vm.ean.substring(vm.ean.length - 1);
		var eanToSeach			= '';

		if (codigoinicial == '02') {
			eanToSeach = codigoinicial + codigoproducto + 'xxxxx';
		} else {
			eanToSeach = vm.ean;
		}

		console.log('EAN: ' + eanToSeach);

		ProductoService.getProduct(eanToSeach)
			.then(function(producto){
				vm.producto = producto;
			})
			.catch(function(data){
				$state.go('bienvenido');
				alert(data.message);
			});
	}

	function addProducto(){
		CarritoService.addProducto(angular.copy(vm.producto));
		$state.go('carrito');
	}
});
