<?php 
include('conexion.php');

function llamarUsers($connection){
    $sql = 'CALL getUsers();';
    $ver_users = $connection->query($sql);
    return $ver_users;
}



