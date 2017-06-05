app.controller('AppController', function($scope, $rootScope, $location, $mdSidenav, SessionService){
	var vm = this;

	vm.currentPath		= '';
	vm.loginText		= '';
	vm.logedIn			= false;
	vm.user				= {};

	vm.login			= login;
	vm.logout			= logout;
	vm.toggleOpciones	= toggleOpciones;
	vm.toggleCarrito	= toggleCarrito;

	$rootScope.$watch(
		function(){
			return $location.path();
		},
		function(){
			vm.currentPath = $location.path();
		}
	);

	$scope.$on('SET_SESSION_DATA', function(event, args) {
		vm.user		= args.user;
		vm.logedIn	= args.logedIn;
	});

	function login(form){
		if (!form.$valid) {
			alert('Revisa si faltan datos por llenar');
			return false;
		}

		SessionService.login(vm.loginText)
			.then(function(user){
				vm.user		= user;
				vm.logedIn	= true;
				$location.path('/bienvenido');
			})
			.catch(function(data){
				vm.logedIn = false;
				$location.path('/login');

				navigator.notification.alert(
					lodash.has(data, 'codError') ? data.messageError : 'Se presento un problema de conexión. Intente mas tarde.',
					null,
					'Alerta',
					'OK'
				);
			});
	}

	function logout(){
		SessionService.logout();

		vm.user		= {};
		vm.logedIn	= false;

		$location.path('/login');
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
});
