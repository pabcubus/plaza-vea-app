app.controller('AppController', function(lodash, $scope, $rootScope, $state, $timeout, $mdSidenav, SessionService){
	var vm = this;

	var d = new Date();
	vm.id= d.getTime();

	vm.backStates		= [
		{
			current: 'login',
			next: null
		},
		{
			current: 'carrito',
			next: 'bienvenido'
		},
		{
			current: 'producto',
			next: 'carrito'
		},
		{
			current: 'bienvenido',
			next: null
		},
		{
			current: 'compra_completada',
			next: 'bienvenido'
		}
	]

	vm.validatingLogin	= false;
	vm.currentPath		= '';
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
	vm.getCurrentPage	= getCurrentPage;
	vm.backBtnEvent		= backBtnEvent;

	$rootScope.$watch(
		function(){
			return $state.current.name;
		},
		function(){
			vm.currentPath = $state.current.name;
		}
	);

	function getCurrentPage(){
		return $state.current.name;
	}

	function backBtnEvent(){
		var backState = lodash.find(vm.backStates, {current : $state.current.name});
		if (lodash.isString(backState.next)) {
			$state.go(backState.next);
		} else {
			navigator.notification.confirm(
				'¿Quieres salir de la app?',
				function(index){
					if (index == 1) {
						navigator.app.exitApp();
					}
				},
				'Confirmar',
				['Si', 'No']
			);
		}
	}

	function login(){
		if(!vm.validatingLogin){
			vm.validatingLogin = true;

			if (!lodash.isNumber(vm.loginText)) {
				$timeout(function(){
					vm.validatingLogin = false;
				}, 1500);

				navigator.notification.alert(
					'Identificación no válida.',
					null,
					'Alerta',
					'OK'
				);

				return false;
			}

			var id = vm.loginText.toString();

			if (vm.selectedLoginType.length != id.length) {
				$timeout(function(){
					vm.validatingLogin = false;
				}, 1500);

				navigator.notification.alert(
					'El ' + vm.selectedLoginType.name + ' debe tener ' + vm.selectedLoginType.length + ' caracteres.',
					null,
					'Alerta',
					'OK'
				);

				return false;
			}

			SessionService.login(id)
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
				})
				.finally(function(){
					vm.validatingLogin = false;
				});
		}
	}

	function logout(){
		navigator.notification.confirm(
			'¿Quieres cerrar tu sesión?',
			function(index){
				if (index == 1) {
					$state.go('login');

					SessionService.logout();

					vm.user		= {};
					vm.logedIn	= false;
				}
			},
			'Confirmar',
			['Si', 'No']
		);
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
