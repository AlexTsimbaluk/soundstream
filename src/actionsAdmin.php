<?php

require_once 'db_connection.php';
require_once 'functions.php';


// Админка
// Создание таблиц
if ($_POST['action'] == 'makeSql' && $_POST['sqlAction'] == 'create_table') {
	
	$query = '';

	if(!empty(isset($_POST['sqlValue']))) {
		switch ($_POST['sqlValue']) {
		    case 'stations':
				$query = "CREATE TABLE stations ( 
							station_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 
							station_title VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE, 
							station_url VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
							PRIMARY KEY (station_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";
				break;

		    case 'users':
				$query = "CREATE TABLE users ( 
							user_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 
							user_login VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
							user_password VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
							user_salt VARCHAR(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
							user_reg_date VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
							PRIMARY KEY (user_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";
				break;

		    case 'visits':
				$query = "CREATE TABLE visits ( 
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
				break;

		    case 'hits':
				$query = "CREATE TABLE hits ( 
							hit_id INT(12) UNSIGNED NOT NULL AUTO_INCREMENT, 
							hit_cookie VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
							hit_timeonsite VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
							hit_date VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
							PRIMARY KEY (hit_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";
				break;

			default:
				break;	        
		}

		makeSQL($query);
	}
}


// Удаление таблиц
if ($_POST['action'] == 'makeSql' && $_POST['sqlAction'] == 'drop_table') {
	
	$query = '';

	if(!empty(isset($_POST['sqlValue']))) {

		$table = $_POST['sqlValue'];

		$query = "drop table $table";
		/*switch ($_POST['sqlValue']) {
		    case 'stations':
				$query = "CREATE TABLE stations ( 
							station_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 
							station_title VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE, 
							station_url VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
							PRIMARY KEY (station_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";
				break;

		    case 'users':
				$query = "CREATE TABLE users ( 
							user_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT, 
							user_login VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
							user_password VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
							user_salt VARCHAR(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
							user_reg_date VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
							PRIMARY KEY (user_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";
				break;

		    case 'visits':
				$query = "CREATE TABLE visits ( 
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
				break;

		    case 'hits':
				$query = "CREATE TABLE hits ( 
							hit_id INT(12) UNSIGNED NOT NULL AUTO_INCREMENT, 
							hit_cookie VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
							hit_timeonsite VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
							hit_date VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
							PRIMARY KEY (hit_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";
				break;

			default:
				break;	        
		}*/

		makeSQL($query);
	}
}