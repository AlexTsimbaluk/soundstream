<?php

$host = "localhost";
$user = "soundstream";
$password = "123456Seven";
$database = "stations_icecast";

/*$link = mysqli_connect($host, $user, $password, $database);
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
}*/

$link = mysql_connect($host, $user, $password);
if(!$link) {
	echo 'Ошибка подключения к MySQL<br>';
	echo mysql_error();
	exit();
} else {
	// echo 'Connect to MySQL<br>';
}


mysql_set_charset('utf8');

if(!mysql_select_db($database, $link)) {
	echo 'Ошибка доступа подключения к базе данных ' . $database . '<br>';
	exit();
} else {
	// echo 'Connect to DB<br>';
}

?>