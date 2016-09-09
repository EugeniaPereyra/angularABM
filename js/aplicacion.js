var miAplicacion = angular.module('angularABM',['ui.router']);

miAplicacion.config(function($stateProvider,$urlRouterProvider){

  $stateProvider

        .state(
          'inicio',{
          url:'/inicio',
          templateUrl:'inicio.html',
          controller:"controlInicio"
        })

        .state(
          'persona',{
          url:'/persona',
          abstract:true,
          templateUrl:'abstractPersona.html',
          controller:'controlPersona'
        })

        .state(
          'persona.menu',{
          url:'/menu',
          views:
          {
          	'contenido':
          	{
          		templateUrl:'personaMenu.html',controller:'controlPersonaMenu'
          	}
          }
        })

         .state(
          'persona.alta',{
          url:'/alta',
          views:
          {
          	'contenido':
          	{
          		templateUrl:'formAlta.html',controller:'controlAlta'
          	}
          }
        })

  $urlRouterProvider.otherwise('/inicio');


});


miAplicacion.controller('controlInicio',function($scope){


});

miAplicacion.controller('controlPersona',function($scope){


});

miAplicacion.controller('controlPersonaMenu',function($scope, $state){

	$scope.IrAlta=function(){
		$state.go('persona.alta');
	}

});

miAplicacion.controller('controlAlta',function($scope){


});


miAplicacion.controller('controlMenu', function($scope, $http) {
 
});