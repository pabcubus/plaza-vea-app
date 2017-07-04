app.service('CarritoService', function($q, lodash, HelperService, DataService){
	var vm = this;

	vm.carrito 				= [];
	vm.carritoTotal			= 0;
	vm.compraTransaccion	= '';

	vm.setCarrito			= setCarrito;
	vm.addProducto			= addProducto;
	vm.removeProducto		= removeProducto;
	vm.clearCarrito			= clearCarrito;
	vm.calcularTotalCarrito	= calcularTotalCarrito;
	vm.terminarCompra		= terminarCompra;

	function setCarrito(carrito){
		vm.carrito = lodash.isArray(carrito) ? carrito : [];
		calcularTotalCarrito();
	};

	function addProducto(productoObject){
		var found = false;

		lodash.forEach(vm.carrito, function(prd){
			if(prd.ean == productoObject.ean){
				found = true;
				prd.cantidad = prd.pesable ? prd.cantidad : (prd.cantidad + productoObject.cantidad);
			}
		});

		if(!found){
			vm.carrito.push(productoObject);
		}

		calcularTotalCarrito();
	}

	function removeProducto(productoObject){
		vm.carrito.forEach(function(prd, index){
			if (prd.ean == productoObject.ean){
				vm.carrito.splice(index, 1);
			}
		});

		calcularTotalCarrito();
	}

	function clearCarrito(){
		vm.carrito = [];

		calcularTotalCarrito();
	}

	function calcularTotalCarrito(){
		vm.carritoTotal = 0;

		lodash.forEach(vm.carrito, function(prd){
			var prodTotal		= parseFloat(prd.precio * prd.cantidad);
			prd.total			= lodash.round(prodTotal, 2);
			prd.totalString		= prd.total.toFixed(2);
			vm.carritoTotal		+= prd.total;
		});

		vm.carritoTotal			= lodash.round(vm.carritoTotal, 2);
		vm.carritoTotalString	= vm.carritoTotal.toFixed(2);

		HelperService.storage.set(HelperService.constants.LOCALSTORAGE_SHOPPING_CART_TAG, vm.carrito, true);
	}

	function terminarCompra(dni, carrito){
		var deferred = $q.defer();

		var jsonRequest = {
			"idTienda": "195",
			"idCliente": dni,
			"items": []
		};

		lodash.forEach(carrito, function(prd){
			jsonRequest.items.push(
				{
					"barcode": prd.ean,
					"qty": prd.cantidad,
					"price": prd.total ? prd.total : 1
				}
			);
		});

		DataService.performOperation('http://10.20.12.36:7080/selfpicking/RegistrarPedido', 'POST', jsonRequest)
			.then(function(result){
				if (lodash.has(result.data, 'codError')){
					deferred.reject(result.data);
				} else {
					vm.compraTransaccion = result.data;
					deferred.resolve(result.data);
					HelperService.storage.remove(HelperService.constants.LOCALSTORAGE_SHOPPING_CART_TAG);
				}
			})
			.catch(function(data){
				deferred.reject(data);
			});

		return deferred.promise;
	}
});
