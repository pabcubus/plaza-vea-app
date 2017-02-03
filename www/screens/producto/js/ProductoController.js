app.controller('ProductoController', function($location, $stateParams, ProductoService){
	var vm = this;

	vm.ean			= $stateParams.ean;
	vm.producto		= {};

	init();

	function init(){
		var codigoinicial 		= vm.ean.substring(0, 2);
		var codigoproducto 		= vm.ean.substring(2, 7);
		var peso 				= vm.ean.substring(7, 12);
		var codigoverificacion 	= vm.ean.substring(vm.ean.length - 1);
		var eanToSeach			= '';

		if (codigoinicial == '02') {
			eanToSeach = codigoinicial + codigoproducto + 'xxxxx' + codigoverificacion;
		} else {
			eanToSeach = vm.ean;
		}

		ProductoService.getProduct(eanToSeach)
			.then(function(producto){
				vm.producto = producto;
			})
			.catch(function(data){
				$location.path('/bienvenido');
				alert(data.message);
			});
	}
});
