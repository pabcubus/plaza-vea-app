app.service('CarritoService', function($q, lodash){
	var vm = this;

	vm.carrito = [];

	vm.addProducto		= addProducto;
	vm.removeProducto	= removeProducto;
	vm.clearCarrito		= clearCarrito;

	function addProducto(productoObject){
		var found = false;

		lodash.forEach(vm.carrito, function(prd){
			if(prd.codigo == productoObject.codigo){
				found = true;
				prd.cantidad += productoObject.cantidad;
			}
		});

		if(!found){
			vm.carrito.push(productoObject);
		}
	}

	function removeProducto(productoObject){
		vm.carrito.forEach(function(prd, index){
			if (prd.codigo == productoObject.codigo){
				vm.carrito.splice(index, 1);
			}
		});
	}

	function clearCarrito(){
		vm.carrito = [];
	}
});
