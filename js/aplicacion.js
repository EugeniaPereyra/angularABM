var miAplicacion = angular.module('angularABM',['ui.router', 'angularFileUpload', 'satellizer']);

miAplicacion.config(function($stateProvider,$urlRouterProvider, $authProvider){

$authProvider.loginUrl='angularABM/servidor/php/auth.php';
$authProvider.tokenName='miToken';
$authProvider.tokenPrefix='angularABM';
$authProvider.authHearder='data';

  $stateProvider

        .state(
          'inicio',{
          url:'/inicio',
          templateUrl:'inicio.html',
          controller:"controlInicio"
        })

        .state(
          'login',{
          url:'/login',
          templateUrl:'login.html',
          controller:"controlLogin"
        })

        // PERSONAS

        .state(
          'persona',{
          url:'/persona',
          abstract:true,
          templateUrl:'abstractPersona.html',
          controller:'controlPersona'
        })

        .state(
          'persona.menu',{
          url:'/personaMenu',
          views:
          {
            'contenido':
            {
              templateUrl:'personaMenu.html',
              controller:'controlPersonaMenu'
            }
          }
        })

        .state(
          'persona.alta',{
          url:'/personaAlta',
          views:
          {
            'contenido':
            {
              templateUrl:'formAlta.html',
              controller:'controlPersonaAlta'
            }
          }
        })

        .state(
          'persona.grilla',{
          url:'/personaGrilla',
          views:
          {
            'contenido':
            {
              templateUrl:'formGrilla.html',
              controller:'controlPersonaGrilla'
            }
          }
        })

        .state(
          'persona.modificar',{
          url:'/personaModificar/:persona',
          views:
          {
            'contenido':
            {
              templateUrl:'formAlta.html',
              controller:'controlPersonaModificar'
            }
          }
        })


  $urlRouterProvider.otherwise('/inicio');


});


miAplicacion.controller('controlInicio',function($scope){
});

miAplicacion.controller('controlLogin',function($scope, $auth, $state){


  $scope.Login=function(){

    $auth.login(
            {
              usuario:$scope.dato.usuario,
              clave:$scope.dato.clave
            })

        .then( function(response){
          if($auth.isAuthenticated())
          {
            console.log("Logueado");
            console.info("Info login: ", $auth.getPayload());
            $state.go('persona.menu');
          }
          else
          {
            console.log("No logueado");
            console.info("Info login:",$auth.getPayload());
          }

        }, function(response){
           console.log(response);
        })
  }
});


// PERSONA

miAplicacion.controller('controlPersona',function($scope, $auth, $state){
    if($auth.isAuthenticated()){
        console.log("Sesi�n iniciada!");
    }
    else{
        console.log("No hay sesi�n!");
        $state.go('login');
    }

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.Logout=function(){
      $auth.logout();
      $state.go('inicio');
    }
});

miAplicacion.controller('controlPersonaMenu',function($scope, $state){

  $scope.IrAlta=function(){
    $state.go('persona.alta');
  }

  $scope.IrGrilla=function(){
    $state.go('persona.grilla');
  }
});

miAplicacion.controller('controlPersonaAlta',function($scope, FileUploader, $http, $state){

        $scope.uploader = new FileUploader({url: 'servidor/upload.php'});
        $scope.uploader.queueLimit = 1;

        $scope.persona={};


      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='pordefecto.png')
          {
            var nombreFoto = $scope.uploader.queue[0]._file.name;
            $scope.persona.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

        $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

        $scope.uploader.onCompleteAll = function() {
            console.info('Se cargo con exito');
            $http.post('servidor/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
            .then(function(respuesta) {             
                 console.log(respuesta.data);
                 $state.go("persona.menu");

            },function errorCallback(response) {        
                console.log( response);           
            });
        };

});

miAplicacion.controller('controlPersonaGrilla',function($scope, $http, $state){
  $http.get('servidor/nexo.php', { params: {accion :"traer"}})
  .then(function(respuesta) {       
         $scope.ListadoPersonas = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoPersonas= [];
        console.log( response);     
   });

  $scope.Borrar=function(persona){
    console.log("borrar"+persona);
    $http.post("servidor/nexo.php",{datos:{accion :"borrar",persona:persona}})
         .then(function(respuesta) {              
                 console.log(respuesta.data);
                  $http.get('servidor/nexo.php', { params: {accion :"traer"}})
                  .then(function(respuesta) {       
                         $scope.ListadoPersonas = respuesta.data.listado;
                         console.log(respuesta.data);
                    },function errorCallback(response) {
                         $scope.ListadoPersonas= [];
                        console.log( response);     
                   });

          },function errorCallback(response) {        
              console.log( response);           
      });
  }

  $scope.Modificar = function(persona){
    console.log( JSON.stringify(persona));
    var dato=JSON.stringify(persona);
    $state.go('persona.modificar', {persona:dato});
  }
});

miAplicacion.controller('controlPersonaModificar',function($scope, $http, $state, $stateParams){
  var dato=JSON.parse($stateParams.persona);
  $scope.persona={};
  $scope.persona.id=dato.id;
  $scope.persona.nombre=dato.nombre;
  $scope.persona.perfil=dato.perfil;
  $scope.persona.email=dato.email;
  $scope.persona.password=dato.password;

  $scope.Guardar=function(){
      $http.post('servidor/nexo.php', { datos: {accion :"modificar",persona:$scope.persona}})
        .then(function(respuesta) 
        {      
          console.log(respuesta.data);
          $state.go("persona.grilla");
        },
        function errorCallback(response)
        {
          console.log( response);           
        });

  }
});

