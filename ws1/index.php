<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';
require_once '../servidor/clases/Usuario.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
/**
* GET: Para consultar y leer recursos
* POST: Para crear recursos
* PUT: Para editar recursos
* DELETE: Para eliminar recursos
*
*  GET: Para consultar y leer recursos */

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/usuarios[/]', function ($request, $response, $args) {
    $response->write("Lista de usuarios");
    
    return $response;
});

$app->get('/usuario[/{id}[/{name}]]', function ($request, $response, $args) {
    $response->write("Datos usuario ");
    var_dump($args);
    return $response;
});
/* POST: Para crear recursos */
$app->post('/usuario/{id}', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    var_dump($args);
    return $response;
});

// /* PUT: Para editar recursos */
$app->put('/usuario/{id}', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    var_dump($args);
    return $response;
});

// /* DELETE: Para eliminar recursos */
$app->delete('/usuario/{id}', function ($request, $response, $args) {
    $response->write("borrar !", $args->id);
    var_dump($args);
    return $response;
});


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------


// TRAE TODOS
$app->get('/personas[/]', function ($request, $response, $args) {
    $respuesta["listado"]=Usuario::TraerTodosLosUsuarios();
    $response->write(json_encode($respuesta));
    
    return $response;
});


// // TRAE UNO
// $app->get('/persona[/{id}[/{name}]]', function ($request, $response, $args) {
//     $respuesta=Usuario::TraerUnUsuarioPorId($args->id);
//     $response->write(json_encode($respuesta));
//     return $response;
// });


// ALTA
$app->post('/persona/{persona}', function ($request, $response, $args) {
    $respuesta=$request->getAttribute(json_decode($args);
    Usuario::Agregar($respuesta);
});

// // MODIFICAR UNO
// $app->put('/usuario/{id}', function ($request, $response, $args) {
//     $response->write("Welcome to Slim!");
//     var_dump($args);
//     return $response;
// });

// // BORRAR UNO
// $app->delete('/usuario/{id}', function ($request, $response, $args) {
//     $response->write("borrar !", $args->id);
//     var_dump($args);
//     return $response;
// });

//---------------------------------------------------------------------


/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
