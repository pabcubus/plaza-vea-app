app.controller('AppController', function($scope, $rootScope, $location, $mdSidenav, SessionService){
	var vm = this;

	vm.currentPath		= '';
	vm.loginText		= '';
	vm.logedIn			= false;
	vm.user				= {};

	vm.login			= login;
	vm.logout			= login;
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

				alert(data.message);
			});
	}

	function logout(){
		vm.logedIn = false;
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
