<?php 
include('conexion.php');

if($_POST){
    $id = $_POST['id'];
    if(!empty($id)){
        $delete = $connection->prepare("DELETE FROM users2 WHERE id = ?");
        $delete->bind_param('i',$id);
        if($delete->execute()){
            echo json_encode(array('response'=>true,'message'=>'se elimino un elemento'));  
        }else{
            echo json_encode(array('response'=>true,'message'=>'algo salio mal')); 
        }
    }
}

