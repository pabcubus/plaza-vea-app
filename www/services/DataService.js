app.service('DataService', function($q, $http, lodash){
	var vm = this;

	vm.performOperation	= performOperation;

	function performOperation(url, operation, data) {
		//10.20.17.88:8282/api/Venta
		var deferred = $q.defer();

		var httpData = {
			'method': operation,
			'url': url,
			'data': (data ? data : {}),
			'timeout': 2000
		};

		$http(httpData).then(function successCallback(response) {
			deferred.resolve(response);
		}, function errorCallback(response) {
			deferred.reject({status: response.status});
		});

		return deferred.promise;
	}
});
