<?php

include_once '../db_connection.php';
include_once '../functions.php';


/*$query = "CREATE TABLE stations ( 
	station_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT , 
	station_title VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE, 
	station_url VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	PRIMARY KEY (station_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";*/

/*ALTER TABLE users CHANGE user_reg_date user_reg_date VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;*/

// $query = "DROP TABLE stations";

/*$query = "delete from stations h where exists 
		(select station_id from stations 
		where station_title = h.station_title and station_url = h.station_url and station_id < h.station_id)";*/

// $query = "DELETE FROM `stations` WHERE `stations`.`station_id` = 1";
// $query = "DELETE FROM `stations` WHERE `stations`.`station_id` = 10905";
// $query = "DELETE FROM `stations` WHERE  `station_id` = 2";

// Удалить shoutcast, оставить icecast
// $query = "DELETE FROM `stations` WHERE  `station_id` > 9200";

// $query = "delete from stations where station_id in (select distinct station_id from stations group by station_id)";

// Добавить запись
/*$query = "insert into stations (station_title, station_url) values ('Club Bollywood', 'http://radiotunes_clubbollywood_aacplus');";*/
// $query = "insert into stations (station_title, station_url) values ('Liquid DnB', 'http://pub2.di.fm/di_liquiddnb_aac');";

// Изменить значение записи
// $query = "update stations set station_url = 'http://radiotunes_clubbollywood_aacplus' WHERE station_id = 9200;"

echo $query . '<br>';

$result = mysql_query($query);

if (!$result) {
	echo '<br>' . mysql_error() . '<br>';
} else {
	echo '<br><br>Update SUCCES!<br><br>';
}

mysql_close($link);

?>
