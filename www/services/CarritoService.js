app.service('CarritoService', function($q, lodash){
	var vm = this;

	vm.carrito = [];
	/*
	vm.carrito = [
		{total: 22, cantidad: 2, pesable: false, codigo:20100019, 	ean:'7750182000796', nombre:'Gaseosa COCA COLA Botella 2.25L', precio:5.6, unidad:'UN'},
		{total: 22, cantidad: 2, pesable: false, codigo:24082, 		ean:'7751158327510', nombre:'Conserva FLORIDA Filete de atún Lata 170Gr', precio:5.99, unidad:'UN'},
		{total: 22, cantidad: 2, pesable: false, codigo:105611, 	ean:'7750885002677', nombre:'Galletas COSTA Soda light clásica Paquete 6Un', precio:2.55, unidad:'UN'},
		{total: 22, cantidad: 2, pesable: false, codigo:20112038, 	ean:'7500435111416', nombre:'Detergente en polvo ARIEL Con downy Bolsa 4Kg', precio:41.9, unidad:'UN'},
		{total: 22, cantidad: 2, pesable: false, codigo:20114017, 	ean:'2200000039422', nombre:'Yogurt BELL\'S Bebible fresa Botella 1Kg', precio:4.49, unidad:'UN'},
		{total: 22, cantidad: 2, pesable: false, codigo:25423, 		ean:'7750151003902', nombre:'Mantequilla LAIVE Con sal Barra 200Gr', precio:5.99, unidad:'UN'},
		{total: 22, cantidad: 2, pesable: false, codigo:20021304, 	ean:'7759185003087', nombre:'Papel higiénico de doble hoja ELITE Económico Paquete 24Un', precio:15.49, unidad:'UN'},
		{total: 22, cantidad: 2, pesable: false, codigo:2294, 		ean:'7750020652903', nombre:'Huevos BELL\'S Pardos de gallina Bandeja 15Un', precio:4.99, unidad:'UN'},
		{total: 22, cantidad: 2, pesable: false, codigo:20093492, 	ean:'7501058617453', nombre:'Cereal NESTLE CORN FLAKES Caja 510Gr', precio:12.99, unidad:'UN'},
		{total: 22, cantidad: 2, pesable: false, codigo:993908, 	ean:'0000000015790', nombre:'Choclo entero Un', precio:1.99, unidad:'UN'},
		{total: 22, cantidad: 2, pesable: false, codigo:21180, 		ean:'7751584000223', nombre:'Chocolate 2 CERRITOS Con grajeas confitadas Bolsa 125Gr', precio:7.89, unidad:'UN'}
	];
	*/
	vm.carritoTotal				= 0;

	vm.addProducto				= addProducto;
	vm.removeProducto			= removeProducto;
	vm.clearCarrito				= clearCarrito;
	vm.changeCantidadProducto	= changeCantidadProducto;

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

		calcularTotalCarrito();
	}

	function changeCantidadProducto(productoObject){
		productoObject.total = Math.round((productoObject.precio * productoObject.cantidad) * 100) / 100;
		calcularTotalCarrito();
	}

	function removeProducto(productoObject){
		vm.carrito.forEach(function(prd, index){
			if (prd.codigo == productoObject.codigo){
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
			vm.carritoTotal += (prd.precio * prd.cantidad);
		});

		vm.carritoTotal = Math.round(vm.carritoTotal * 100) / 100;
	}
});
