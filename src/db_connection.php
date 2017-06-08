<?php

/*For home*/
$host = "localhost";
$user = "root";
$password = "9";
$database = "stations_icecast";

/*For server
$host = "localhost";
$user = "soundstream";
$password = "123456Seven";
$database = "stations_icecas";*/


$link = mysqli_connect($host, $user, $password, $database);
if(!$link) {
	echo 'Ошибка подключения к MySQL<br>';
	echo mysqli_error($link);
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

?>