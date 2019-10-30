<?php 

header("Access-Control-Allow-Origin: *");

try {
    $pdo = new PDO("mysql:host=localhost;dbname=taller", "root", "root");
}catch (PDOException $e){
    echo $e->getMessage();
}

$sql = "SELECT id, nombre, edad FROM usuario";
$resultado = $pdo->query($sql);
$datos = array();
while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
    $datos[] = $row;
}
echo json_encode($datos);

?>