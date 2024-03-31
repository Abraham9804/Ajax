<?php 

$host = 'localhost';
$user = 'root';
$password = '12qwaszx';
$db = 'usuarios';

$connection = new mysqli($host, $user, $password, $db);

if($connection -> connect_errno){
    die('No fue posible conectar con el servidor').$connect->connect_error;
}