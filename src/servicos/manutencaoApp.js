var app = angular
    .module('manutencaoApp', [
        'ui.router'
    ]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '../src/template/home.html',
            controller: 'OrdemServicosController'
        })
        .state('ordem-servico', {
            url: '/ordem-servico',
            templateUrl: '../src/template/cadastro.html',
            controller: 'OrdemServicosController'
        })
        .state('editOrdemServico', {
            url: '/ordem-servico/:id',
            templateUrl: '../src/template/cadastro.html',
            controller: 'OrdemServicosController'
        })
        .state('clientes', {
            url: '/clientes',
            templateUrl: '../src/template/clientes/listagem-clientes.html',
            controller: 'ClientesController'
        })
        .state('cliente', {
            url: '/cliente/',
            templateUrl: '../src/template/clientes/cadastro-cliente.html',
            controller: 'ClientesController'
        })
        .state('editCliente', {
            url: '/cliente/:id',
            templateUrl: '../src/template/clientes/cadastro-cliente.html',
            controller: 'ClientesController'
        })

    // Utilizando o HTML5 History API
    // $locationProvider.html5Mode(true);
});


app.controller('HomeController', function($scope) {
    $scope.message = 'Routing pages with ngRoute is damn awesome!';
});

app.controller('OrdemServicosController', function($scope, FctOrdemServicos, FctCiente, $stateParams, $location, $filter) {
    $scope.ordemServicos = {};
    $scope.clientes = {};
    $scope.ordemServico = {};
    $scope.alert_success = false;
    $scope.alert_danger = false;

    let ordemServicosId = $stateParams.id;


    let init = function () {
        FctCiente.listCliente().then(function(data) {
            $scope.clientes = data;
        }).catch(function (e) {
            console.log(e);
        })

        FctOrdemServicos.listOrdemServicos().then(function(data) {
            $scope.ordemServicos = data;
            if (ordemServicosId !== undefined) {
                $scope.ordemServico = $scope.ordemServicos.filter(function filtrar(ordemServico) {
                    return  ordemServico.id === parseInt(ordemServicosId);
                })[0];
            }
        }).catch(function (e) {
            console.log(e);
        })
    };


    $scope.onSalvar = function(ordemServico) {


        if (ordemServico.id === undefined) {
            let data = new Date();
            ordemServico.data = $filter('date')(data, 'yyyy-MM-dd');
            ordemServico.data_resolucao = null;
            ordemServico.status = 'A';
        }

        if (ordemServico.data_resolucao !== undefined){
            let dataResolucao = new Date(ordemServico.data_resolucao);
            ordemServico.data_resolucao = $filter('date')(dataResolucao, 'yyyy-MM-dd');
        } else {
            ordemServico.data_resolucao = null;
        }

        FctOrdemServicos.addOrdemServicos(ordemServico).then(function () {
            $scope.alert_success = true;
            $scope.ordemServico = {};
            document.getElementById('form-contato').reset();
            $location.path('/');
        }).catch(function (e) {
            $scope.alert_danger = true;
            console.log(e);
        });
    }

    $scope.onDelete = function(id) {
        FctOrdemServicos.delOrdemServicos(id).then(function () {
            init();
        }).catch(function (e) {
            console.log(e);
        });
    }

    init();
});

app.controller('ClientesController', function($scope, FctCiente, $stateParams, $location, $filter) {

    $scope.clientes = [];
    $scope.cliente ={};
    $scope.alert_success = false;
    $scope.alert_danger = false;

    let clienteId = $stateParams.id;

    let init = function () {
        FctCiente.listCliente().then(function(data) {
            $scope.clientes = data;
            if (clienteId !== undefined) {
                $scope.cliente = $scope.clientes.filter(function filtrar(cliente) {
                    return  cliente.id === parseInt(clienteId);
                })[0];
            }
        }).catch(function (e) {
            console.log(e);
        })
    };

    $scope.onSalvar = function(cliente) {

        FctCiente.addCleinte(cliente).then(function () {
            $scope.alert_success = true;
            $scope.cliente = {};
            document.getElementById('form-contato').reset();
            $location.path('/clientes');
        }).catch(function (e) {
            $scope.alert_danger = true;
            console.log(e);
        });
    }


    $scope.onDelete = function(id) {
        FctCiente.delCliente(id).then(function () {
            init();
        }).catch(function (e) {
            console.log(e);
        });
    }

    init();
});

