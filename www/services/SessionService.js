app.service('SessionService', function($q, lodash, DataService, HelperService, CarritoService){
	var vm = this;

	vm.user = {};
	vm.logedIn = false;

	vm.login = login;
	vm.logout = logout;

	init();

	function login(loginText){
		//{"idCliente":"40220040"}
		var deferred = $q.defer();

/*
		var user = {
			id : loginText,
			nombre : 'Pablo',
			nombreCompleto : 'Pablo Bassil'
		};

		vm.logedIn = true;
		vm.user	= user;
		HelperService.storage.set(HelperService.constants.LOCALSTORAGE_USER_TAG, vm.user, true);

		deferred.resolve(user);
*/

		if (lodash.isString(loginText)) {
			var jsonRequest = {
				"idCliente":loginText
			};

			DataService.performOperation('http://10.20.12.36:7080/selfpicking/Login', 'POST', jsonRequest)
				.then(function(result){
					if (lodash.has(result.data, 'codError')){
						deferred.reject(result.data);
					} else {
						var nombres = result.data.nomCliente.replace(',', '').split(' ');
						var user = {
							id : loginText,
							nombre : lodash.isString(nombres[0]) ? nombres[0] : 'Usuario',
							nombreCompleto : result.data.nomCliente
						};

						vm.logedIn = true;
						vm.user	= user;
						HelperService.storage.set(HelperService.constants.LOCALSTORAGE_USER_TAG, vm.user, true);

						deferred.resolve(user);
					}
				})
				.catch(function(data){
					deferred.reject(data);
				});
		}

		return deferred.promise;
	}

	function logout(){
		vm.user = {};
		vm.logedIn = false;

		HelperService.storage.remove(HelperService.constants.LOCALSTORAGE_USER_TAG);

		CarritoService.clearCarrito();
	}

	function init(){
		var user = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_USER_TAG, true);
		if (lodash.isObject(user)) {
			vm.user = (user ? user : {});
			vm.logedIn = true;

			var carrito		= HelperService.storage.get(HelperService.constants.LOCALSTORAGE_SHOPPING_CART_TAG, true);
			var carritoNew	= [];

			lodash.forEach(carrito, function(item){
				carritoNew.push({
					cantidad: item.cantidad,
					ean: item.ean,
					image: item.image,
					nombre: item.nombre,
					pesable: item.pesable,
					precio: item.precio,
					total: item.total,
					unidad: item.unidad
				})
			});

			CarritoService.setCarrito(   carritoNew   );
		}
	}
});
