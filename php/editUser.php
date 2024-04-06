<?php 
include('conexion.php');

if($_POST){
    if(!empty($_POST['id'])||!empty($_POST['nombre'])||!empty($_POST['edad'])||!empty($_POST['pais'])||!empty($_POST['correo'])){

        $id     = $_POST['id'];
        $nombre = $_POST['nombre'];
        $edad   = $_POST['edad'];
        $pais   = $_POST['pais'];
        $correo = $_POST['correo'];

        $update = $connection->prepare("UPDATE users2 SET correo = ?, edad = ?, nombre = ?, pais = ? WHERE id = ?");
        $update->bind_param("sissi", $correo, $edad, $nombre, $pais, $id);
        if($update->execute()){
            echo json_encode(array('response'=>true,'message'=>'datos actualizados'));
        }else{
            echo json_encode(array('response'=>false,'message'=>'error al actualizar'));
        }
    }
}