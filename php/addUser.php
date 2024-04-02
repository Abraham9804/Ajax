<?php 
include('conexion.php');
$nombre = $_POST['nombre'];
$edad   = $_POST['edad'];
$pais   = $_POST['pais'];
$correo = $_POST['correo'];


$sql = $connection->prepare("INSERT INTO users2 (nombre, edad, pais, correo) VALUES (?,?,?,?)");
$sql->bind_param("siss",$nombre, $edad, $pais, $correo);
$sql->execute();
if($connection->affected_rows <=0){
    $respuesta = ['error'=>true, 'mensaje'=>'algo salio mal'];
}else{
    $respuesta = ['mensaje'=>'datos insertados'];
}


echo json_encode($respuesta);