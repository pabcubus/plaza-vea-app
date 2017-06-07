app.controller('AppController', function(lodash, $scope, $rootScope, $state, $mdSidenav, SessionService, HelperService){
	var vm = this;

	var d = new Date();
	vm.id= d.getTime();

	vm.currentPath		= '';
	vm.loginText		= '';
	vm.logedIn			= false;
	vm.user				= {};
	vm.loginTypes = [
		{
			name: 'DNI',
			length: 8
		},
		{
			name: 'CE',
			length: 12
		}
	];
	vm.selectedLoginType = vm.loginTypes[0];

	vm.login			= login;
	vm.logout			= logout;
	vm.toggleOpciones	= toggleOpciones;
	vm.toggleCarrito	= toggleCarrito;

	$rootScope.$watch(
		function(){
			return $state.current.name;
		},
		function(){
			vm.currentPath = $state.current.name;
		}
	);

	function login(){
		vm.loginText = String(vm.loginText);

		if (!lodash.isString(vm.loginText) || (vm.selectedLoginType.length != vm.loginText.length)) {
			navigator.notification.alert(
				'Revisa si faltan datos por llenar o si los datos son válidos',
				null,
				'Alerta',
				'OK'
			);
			return false;
		}

		SessionService.login(vm.loginText)
			.then(function(user){
				vm.user		= user;
				vm.logedIn	= true;
				$state.go('bienvenido');
			})
			.catch(function(data){
				vm.logedIn = false;
				$state.go('login');

				var message = lodash.has(data, 'codError') ? data.messageError : 'Se presento un problema de conexión. Intente mas tarde.';
				navigator.notification.alert(
					message,
					null,
					'Alerta',
					'OK'
				);
			});
	}

	function logout(){
		$state.go('login');

		SessionService.logout();

		vm.user		= {};
		vm.logedIn	= false;
	}

	function toggleOpciones() {
		$mdSidenav('left')
			.toggle()
			.then(function() {});
	}

	function toggleCarrito() {
		$mdSidenav('right')
			.toggle()
			.then(function() {});
	}

	// $locationChangeSuccess
	$scope.$on('$viewContentLoaded', function(){
		if (SessionService.logedIn) {
			var path = (lodash.isString($state.current.name) && $state.current.name.length > 0) ? $state.current.name : 'login';
			var state = (path != 'login') ? path : 'bienvenido';

			$state.go(state);
		} else {
			$state.go('login');
		}

		vm.user		= SessionService.user;
		vm.logedIn	= SessionService.logedIn;
	});
});
