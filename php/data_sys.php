<?php 
include('conexion.php');

function llamarUser($connection){
    $sql = 'CALL getUsers();';
    $ver_users = $connection->query($sql);
    return $ver_users;
}



