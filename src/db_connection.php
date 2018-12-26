<?php

session_start();

/*if($_SERVER['HTTP_ORIGIN'] == "http://soundstream" || $_SERVER['HTTP_ORIGIN'] == "http://localhost:9999") {
	// For home
	$host = "localhost";
	$user = "root";
	$password = "9";
	$database = "radio_ra";
} elseif($_SERVER['HTTP_ORIGIN'] == "http://radiora.ru") {
	// For remote server
	$host = "localhost";
	$user = "radiorar";
	$password = "39at6F6dEp";
	$database = "radiora";
}*/

$host = "localhost";
$user = "radiorar";
$password = "39at6F6dEp";
$database = "radiora";


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
