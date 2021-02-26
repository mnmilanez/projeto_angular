app.service('FctCiente', function ($q, $http) {
    this.addCleinte = function (cliente) {

        let defer = $q.defer();

        $http({
            method: cliente.id !== undefined ? 'PUT' : 'POST',
            url: cliente.id !== undefined ? 'http://localhost:8080/clientes/' + cliente.id : 'http://localhost:8080/clientes' ,
            data: (cliente ? cliente : {}),
            headers: {'Content-Type': 'application/json;'},
            // skipContentTypeHeaderDefinition: true
        }).then(function (response) {
            defer.resolve(response.data);
        }, function (response) {
            defer.reject(response);
        });

        return defer.promise;
    };

    this.listCliente = function(params = {}) {
        let defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:8080/clientes',
            params: (params || {})
        }).then(function (response) {
            defer.resolve(response.data);
        }, function (response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    this.delCliente = function(id) {
        let defer = $q.defer();

        $http({
            method: 'DELETE',
            url: 'http://localhost:8080/clientes/' + id,
        }).then(function (response) {
            defer.resolve(response.data);
        }, function (response) {
            defer.reject(response);
        });

        return defer.promise;
    }
})