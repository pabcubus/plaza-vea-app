app.config(
	function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/bienvenido');
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'screens/login/html/login.html',
				controller: 'LoginController',
				controllerAs: 'lc'
			})
			.state('bienvenido', {
				url: '/bienvenido',
				templateUrl: 'screens/bienvenido/html/bienvenido.html',
				controller: 'BienvenidoController',
				controllerAs: 'bc'
			})
			.state('producto', {
				url: '/producto/{ean:\\d{3,}}',
				templateUrl: 'screens/producto/html/producto.html',
				controller: 'ProductoController',
				controllerAs: 'pc'
			})
			.state('carrito', {
				url: '/carrito',
				templateUrl: 'screens/carrito/html/carrito.html',
				controller: 'CarritoController',
				controllerAs: 'cc'
			})
			.state('compra_completada', {
				url: '/compra_completada',
				templateUrl: 'screens/compra_completada/html/compra_completada.html',
				controller: 'CompraCompletadaController',
				controllerAs: 'ccc'
			});
	}
);

app.config(['$mdAriaProvider', function($mdAriaProvider) {
	$mdAriaProvider.disableWarnings();
}])
