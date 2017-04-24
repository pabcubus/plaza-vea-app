app.controller('ProductoController', function($state, $stateParams, ProductoService, CarritoService){
	var vm = this;

	vm.ean						= $stateParams.ean;
	vm.producto					= {};

	vm.addProducto				= addProducto;
	vm.changeCantidadProducto	= changeCantidadProducto;

	init();

	function init(){
		var codigoinicial 		= vm.ean.substring(0, 2);
		var codigoproducto 		= vm.ean.substring(2, 7);
		var peso 				= vm.ean.substring(7, 12);
		var codigoverificacion 	= vm.ean.substring(vm.ean.length - 1);
		var eanToSearch			= '';

		if (codigoinicial == '02') {
			eanToSearch = codigoinicial + codigoproducto + 'xxxxx';
		} else {
			eanToSearch = vm.ean;
		}

		ProductoService.getProduct(eanToSearch)
			.then(function(producto){
				vm.producto				= angular.copy(producto);
				vm.producto.ean			= codigoinicial + codigoproducto + peso + (codigoinicial == '02' ? producto.ean.substring(12, 13) : codigoverificacion);
				vm.producto.pesable		= codigoinicial == '02' ? true : false;
				vm.producto.cantidad	= codigoinicial == '02' ? (parseInt(peso) / 1000) : vm.producto.cantidad;
				vm.producto.total		= Math.round((vm.producto.cantidad * vm.producto.precio) * 100) / 100;
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

	function changeCantidadProducto(){
		vm.producto.total = Math.round((vm.producto.cantidad * vm.producto.precio) * 100) / 100;
	}
});
