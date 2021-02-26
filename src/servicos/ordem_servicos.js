app.service('FctOrdemServicos', function ($q, $http) {
    this.listOrdemServicos = function(params = {}) {
        let defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:8080/ordem-servicos',
            params: (params || {})
        }).then(function (response) {
            defer.resolve(response.data);
        }, function (response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    this.addOrdemServicos = function (cliente) {

        let defer = $q.defer();


        $http({
            method: cliente.id !== undefined ? 'PUT' : 'POST',
            url: cliente.id !== undefined ? 'http://localhost:8080/ordem-servicos/' + cliente.id : 'http://localhost:8080/ordem-servicos' ,
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

    this.delOrdemServicos = function(id) {
        let defer = $q.defer();

        $http({
            method: 'DELETE',
            url: 'http://localhost:8080/ordem-servicos/' + id,
        }).then(function (response) {
            defer.resolve(response.data);
        }, function (response) {
            defer.reject(response);
        });

        return defer.promise;
    }
});