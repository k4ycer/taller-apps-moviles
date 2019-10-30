<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
ini_set('display_errors', 1);

// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);

$nombre = $data->nombre;
$edad = $data->edad;

if ($nombre != "" && $edad != "") {
    try {
        $pdo = new PDO("mysql:host=localhost;dbname=taller", "root", "root");
        $resultado = $pdo->prepare('INSERT INTO usuario(nombre,edad) VALUES(:a,:b)');
        $resultado->bindParam(":a", $nombre, PDO::PARAM_STR);
        $resultado->bindParam(":b", $edad, PDO::PARAM_STR);
        $resultado->execute();
    } catch (PDOException $e) {
        echo $e->getMessage();
        exit();
    }
    echo "1";
} else {
    echo "-1";
    exit();
}
?> 

