app.service('CarritoService', function($q, lodash, DataService){
	var vm = this;

	vm.carrito = [];

	vm.carritoTotal				= 0;

	vm.addProducto				= addProducto;
	vm.removeProducto			= removeProducto;
	vm.clearCarrito				= clearCarrito;
	vm.calcularTotalCarrito		= calcularTotalCarrito;
	vm.terminarCompra			= terminarCompra;

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
			var prodTotal	= lodash.round((prd.precio * prd.cantidad), 2);
			prd.total		= prodTotal;
			vm.carritoTotal	+= prodTotal;
		});

		vm.carritoTotal = lodash.round(vm.carritoTotal, 2);
	}

	function terminarCompra(dni, carrito){
		var deferred = $q.defer();

		var jsonRequest = {
			"idTienda": "195",
			"idCliente": "40220040",
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
				deferred.resolve(result.data);
			})
			.catch(function(data){
				deferred.reject(data);
			});

		return deferred.promise;
	}
});


/*
http://10.20.12.36:7080/selfpicking/ConsultarProducto

{"idtienda":"195","barcode":"7790470081854"}



http://10.20.12.36:7080/selfpicking/RegistrarPedido

{"idTienda":"195","idCliente":"40220040","items":[{"barcode":"7751158327510","qty": 1,"price": 3.3},{"barcode":"7750151003902","qty": 2,"price": 4.4}]}
*/
