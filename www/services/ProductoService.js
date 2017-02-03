app.service('ProductoService', function($q, lodash){
	var vm = this;

	vm.products = [
		{codigo:20100019, 	ean:'7750182000796', nombre:'Gaseosa COCA COLA Botella 2.25L', precio:5.6, unidad:'UN'},
		{codigo:24082, 		ean:'7751158327510', nombre:'Conserva FLORIDA Filete de atún Lata 170Gr', precio:5.99, unidad:'UN'},
		{codigo:105611, 	ean:'7750885002677', nombre:'Galletas COSTA Soda light clásica Paquete 6Un', precio:2.55, unidad:'UN'},
		{codigo:20112038, 	ean:'7500435111416', nombre:'Detergente en polvo ARIEL Con downy Bolsa 4Kg', precio:41.9, unidad:'UN'},
		{codigo:20114017, 	ean:'2200000039422', nombre:'Yogurt BELL\'S Bebible fresa Botella 1Kg', precio:4.49, unidad:'UN'},
		{codigo:25423, 		ean:'7750151003902', nombre:'Mantequilla LAIVE Con sal Barra 200Gr', precio:5.99, unidad:'UN'},
		{codigo:20021304, 	ean:'7759185003087', nombre:'Papel higiénico de doble hoja ELITE Económico Paquete 24Un', precio:15.49, unidad:'UN'},
		{codigo:2294, 		ean:'7750020652903', nombre:'Huevos BELL\'S Pardos de gallina Bandeja 15Un', precio:4.99, unidad:'UN'},
		{codigo:20093492, 	ean:'7501058617453', nombre:'Cereal NESTLE CORN FLAKES Caja 510Gr', precio:12.99, unidad:'UN'},
		{codigo:993908, 	ean:'0000000015790', nombre:'Choclo entero Un', precio:1.99, unidad:'UN'},
		{codigo:21180, 		ean:'7751584000223', nombre:'Chocolate 2 CERRITOS Con grajeas confitadas Bolsa 125Gr', precio:7.89, unidad:'UN'},
		{codigo:848879, 	ean:'0201249xxxxx2', nombre:'Papa blanca procesada Precio x Kg (3 unid aprox = 1kg)', precio:2.99, unidad:'KG'},
		{codigo:924003, 	ean:'0200111xxxxx3', nombre:'Papaya extra Precio x Kg (1 unid = 2.5kg aprox)', precio:4.99, unidad:'KG'},
		{codigo:844123, 	ean:'0200140xxxxx3', nombre:'Cebolla roja Precio x Kg (5 unid aprox = 1kg)', precio:1.99, unidad:'KG'},
		{codigo:60288, 		ean:'0200228xxxxx8', nombre:'Limón ácido Precio x Kg (1 unid = 100gr) Peso limón = 30gr aprox', precio:2.49, unidad:'KG'},
		{codigo:60769, 		ean:'0200271xxxxx4', nombre:'Tomate italiano Precio x Kg (5 unid aprox = 1kg)', precio:4.59, unidad:'KG'},
		{codigo:20064830, 	ean:'0216835xxxxx9', nombre:'Manzana importada roja Precio x Kg (5 unid aprox = 1kg)', precio:7.99, unidad:'KG'},
		{codigo:48640, 		ean:'0202101xxxxx2', nombre:'Naranja de jugo Precio x Kg (4 unid aprox = 1kg)', precio:2.29, unidad:'KG'},
		{codigo:20056137, 	ean:'0216680xxxxx5', nombre:'Mandarina Chiqui Precio x Kg (7 unid aprox = 1kg)', precio:4.49, unidad:'KG'}
	];

	vm.getProduct = getProduct;

	function getProduct(ean){
		var deferred = $q.defer();

		var producto = lodash.find(vm.products, function(prd){
			return prd.ean.indexOf(ean) != -1;
		});

		if (lodash.isObject(producto)) {
			producto.cantidad	= 1;
			deferred.resolve(producto);
		} else {
			deferred.reject({message: 'Producto no registrado'});
		}

		return deferred.promise;
	}
});
