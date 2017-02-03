app.config(
	function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/login');
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'screens/login/html/login.html',
				controller: 'LoginController',
				controllerAs: 'lc'
			})
			.state('producto', {
				url: '/producto/{ean:\\d{3,}}',
				templateUrl: 'screens/producto/html/producto.html',
				controller: 'ProductoController',
				controllerAs: 'pc'
			})
			.state('menu', {
				url: '/menu',
				templateUrl: 'screens/menu/html/menu.html',
				controller: 'MenuController',
				controllerAs: 'mc'
			})
			.state('bienvenido', {
				url: '/bienvenido',
				templateUrl: 'screens/bienvenido/html/bienvenido.html',
				controller: 'BienvenidoController',
				controllerAs: 'bc'
			});
	}
);
