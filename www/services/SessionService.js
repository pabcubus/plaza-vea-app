app.service('SessionService', function($q, lodash, DataService, HelperService){
	var vm = this;

	vm.user = {};
	vm.logedIn = false;
	/*
	vm.users = [
		{dni:9298312, nombre:'CARLOS ALBERTO MARTIN', apellido:'ARMIJO', correo:'carlos.flores@spsa.com.pe'},
		{dni:7909326, nombre:'ADELBERTO DOMINIK', apellido:'CARO', correo:'Adelberto.Muller@spsa.com.pe'},
		{dni:944273, nombre:'JOSE ESTEBAN', apellido:'XXX', correo:'jose.sejas@spsa.com.pe'},
		{dni:963464, nombre:'SERGIO JOSE', apellido:'XXX', correo:'Sergio.Agnello@spsa.com.pe'},
		{dni:9872956, nombre:'MARIELA', apellido:'MOGROVEJO', correo:'Mariela.Prado@spsa.com.pe'},
		{dni:91131, nombre:'JUAN CARLOS', apellido:'BLANCO', correo:'juan.vallejo@spsa.com.pe'},
		{dni:937684, nombre:'ANDRES ALEJANDRO', apellido:'LABRA', correo:'Andres.Zolezzi@spsa.com.pe'},
		{dni:10811420, nombre:'JUAN LUIS', apellido:'GASTELO', correo:'JuanLuis.Cruz@spsa.com.pe'},
		{dni:7618492, nombre:'OSCAR EDUARDO', apellido:'ALVAREZ', correo:'oscar.ramos@intercorpretail.pe'},
		{dni:43099441, nombre:'JUAN CARLOS', apellido:'FERNANDEZ', correo:'Juan.Medinaf@spsa.com.pe'},
		{dni:7482948, nombre:'ROSA BERDA', apellido:'FASANANDO', correo:'Rosa.DelgadoFasanando@spsa.com.pe'},
		{dni:40563603, nombre:'JOSE EMYL', apellido:'ALARCON', correo:'Jose.Gallardo@spsa.com.pe'},
		{dni:40220040, nombre:'CARLOS ENRIQUE', apellido:'ZAPATA', correo:'Carlos.Espinoza@intercorpretail.pe'},
		{dni:48037257, nombre:'ANGELA', apellido:'CHAVEZ', correo:'Angela.Manrique@intercorpretail.pe'},
		{dni:10806662, nombre:'ALFREDO', apellido:'LANFRANCO', correo:'Alfredo.Uriarte@intercorpretail.pe'},
		{dni:10810736, nombre:'CAROLINA', apellido:'ARRIARAN', correo:'carolina.filinich@spsa.com.pe'},
		{dni:45197359, nombre:'CAROLINA ALEJANDRA', apellido:'CASAS', correo:'alejandra.pye@spsa.com.pe'},
		{dni:44444584, nombre:'PIERO ALEXANDER', apellido:'ZALDIVAR', correo:'Piero.Ibanez@intercorpretail.pe'},
		{dni:46818879, nombre:'EDUARDO', apellido:'CUSIRRAMOS', correo:'jleon@spsa.com.pe'},
		{dni:1234, nombre:'EDUARDO', apellido:'CUSIRRAMOS', correo:'pablo@hotmail.com'}
	];
	*/

	vm.login = login;
	vm.logout = logout;

	init();

	function login(loginText){
		//{"idCliente":"402200234"}
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
	}

	function init(){
		var user = HelperService.storage.get(HelperService.constants.LOCALSTORAGE_USER_TAG, true);
		if (lodash.isObject(user)) {
			vm.user = (user ? user : {});
			vm.logedIn = true;
		}
	}
});
