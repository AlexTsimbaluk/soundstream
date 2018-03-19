<?php

include_once '../db_connection.php';
include_once '../functions.php';

// Создание базы данных radio_ra с кодировкой utf8
/*$query = "CREATE DATABASE radio_ra CHARACTER SET utf8 COLLATE utf8_general_ci";*/

// Stations table
/*$query = "CREATE TABLE stations ( 
	station_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 
	station_title VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE, 
	station_url VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	PRIMARY KEY (station_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";*/

// Temporary table for stations
/*$query = "CREATE TABLE stations_temp ( 
	station_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 
	station_title VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE, 
	station_url VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	PRIMARY KEY (station_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";*/


// Users table
/*$query = "CREATE TABLE users ( 
	user_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 
	user_login VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	user_password VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	user_salt VARCHAR(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	user_reg_date VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	user_cookie VARCHAR(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	PRIMARY KEY (user_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";*/

// Visits table
/*$query = "CREATE TABLE visits ( 
	visit_id INT(12) UNSIGNED NOT NULL AUTO_INCREMENT,
	visit_cookie VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	visit_ip VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	visit_ref VARCHAR(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	visit_useragent VARCHAR(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	visit_platform VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	visit_screensize VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	visit_browsersize VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	visit_timeonsite VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	visit_date VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY (visit_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";
*/
// Hits table
/*$query = "CREATE TABLE hits ( 
	hit_id INT(12) UNSIGNED NOT NULL AUTO_INCREMENT, 
	hit_cookie VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	hit_timeonsite VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	hit_date VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY (hit_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";*/

/*ALTER TABLE users CHANGE user_reg_date user_reg_date VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;*/

// $query = "drop table stations";
// $query = "drop table stations_temp";

/*$query = "delete from stations h where exists 
		(select station_id from stations 
		where station_title = h.station_title and station_url = h.station_url and station_id < h.station_id)";*/

// $query = "delete from stations where station_id = 1";

// Удалить shoutcast, оставить icecast
// $query = "DELETE FROM `stations` WHERE  `station_id` > 9200";

// $query = "delete from stations where station_id in (select distinct station_id from stations group by station_id)";

// Добавить запись
/*$query = "insert into stations (station_title, station_url) values ('Club Bollywood', 'http://radiotunes_clubbollywood_aacplus');";*/
// $query = "insert into stations (station_title, station_url) values ('Liquid DnB', 'http://pub2.di.fm/di_liquiddnb_aac');";

// Изменить значение записи
// $query = "update stations set station_url = 'http://radiotunes_clubbollywood_aacplus' WHERE station_id = 9200;"

echo '<br>' . $query . '<br>';

$result = mysqli_query($link, $query);

if (!$result) {
	echo '<br>' . mysqli_error($link) . '<br>';
} else {
	echo '<br><br>Update SUCCES!<br><br>';
}

mysqli_close($link);

?>
