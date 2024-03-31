<?php 
error_reporting(0);
include('conexion.php');
include('data_sys.php');

$datos = array();

$mostrarUsuarios = llamarUsers($connection);
if($mostrarUsuarios->num_rows>0){
    while($rows = $mostrarUsuarios->fetch_assoc()){
        $datos[] = $rows;
    }
    echo json_encode($datos);
}else{
    $error = ['error'=>true];
    echo json_encode($error);
}

$connection->close();