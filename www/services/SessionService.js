app.service('SessionService', function($q, lodash){
	var vm = this;

	vm.user = {};
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

	vm.login = login;

	function login(loginText){
		var deferred = $q.defer();

		var user = lodash.find(vm.users, function(user){
			return user.dni == loginText || user.correo.toLowerCase() == loginText.toLowerCase();
		});

		if (lodash.isObject(user)) {
			var nombres = user.nombre.split(' ');
			user.nombre = nombres[0];

			vm.user = user;

			deferred.resolve(user);
		} else {
			deferred.reject({message: 'Usuario no registrado'});
		}

		return deferred.promise;
	}
});
