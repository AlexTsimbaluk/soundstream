<?php

session_start();

/*For home*/
$host = "localhost";
$user = "root";
$password = "9";
$database = "radio_ra";

/*For remote server*/
/*$host = "nowtaxi.mysql";
$user = "nowtaxi_sanek";
$password = "h347bH12";
$database = "nowtaxi_radiora";*/

$link = mysqli_connect($host, $user, $password, $database);
if(!$link) {
	echo 'Ошибка подключения к MySQL<br>';
	echo mysqli_error();
	exit();
} else {
	// echo 'Connect to MySQL<br>';
}


mysqli_set_charset($link, 'utf8');

if(!mysqli_select_db($link, $database)) {
	echo 'Ошибка доступа подключения к базе данных ' . $database . '<br>';
	exit();
} else {
	// echo 'Connect to DB<br>';
}

// session_start();

?>
