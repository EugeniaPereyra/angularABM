var miAplicacion = angular.module('angularABM',['ui.router', 'angularFileUpload']);

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

miAplicacion.controller('controlAlta',function($scope,FileUploader){
        $scope.persona={};

        $scope.uploader = new FileUploader({url: 'PHP/upload.php'});
        $scope.uploader.queueLimit = 10;

        $scope.Guardar=function(){
        }

      $scope.cargar = function(){
            /** llamo a la funcion uploadAll para cargar toda la cola de archivos **/
            $scope.uploader.uploadAll();
            /** agrego mi funcionalidad **/
        }

                $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
              console.info('onErrorItem', fileItem, response, status, headers);
          };

          $scope.uploader.onCompleteAll = function() {
              console.info('Se cargo con exito');
          };
  });


miAplicacion.controller('controlMenu', function($scope, $http) {
 
});

