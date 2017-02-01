app.controller('AppController', function($location, $mdSidenav){
	var vm = this;

	vm.dni = '';
	vm.logedIn = false;

	vm.login = login;
	vm.logout = login;
	vm.toggleOpciones = toggleOpciones;
	vm.toggleCarrito = toggleCarrito;

	function login(){
		vm.logedIn = true;
		$location.path('/bienvenido');
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
