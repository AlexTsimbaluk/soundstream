<?php

$host = "localhost";
$user = "root";
$password = "";
/*$user = "soundstream";
$password = "123456Seven";*/
$database = "stations_icecast";

/*$link = mysql_connect($host, $user, $password) or die("Ошибка " . mysql_error($link));
mysql_select_db($database, $link) or die (mysql_error());*/

$link = mysql_connect($host, $user, $password);
if(!$link) {
	echo 'Ошибка подключения к MySQL<br>';
	echo mysql_error($link);
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