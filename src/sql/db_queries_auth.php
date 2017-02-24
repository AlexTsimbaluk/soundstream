<?php

include_once 'db_connection.php';


/*$query = "CREATE TABLE users ( 
	user_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT , 
	user_login VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
	user_password VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
	user_email VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
	user_reg_date VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
	PRIMARY KEY (user_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";*/

/*ALTER TABLE users CHANGE user_reg_date user_reg_date VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;*/

// $query = "DROP TABLE comments";

/*$query = "CREATE TABLE comments ( 
	comment_id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT , 
	comment_content VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
	comment_signature VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
	comment_date VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
	PRIMARY KEY (comment_id)) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci";*/

echo $query . '<br>';

$result = mysql_query($query);

if (!$result) {
	echo '<br>' . mysql_error() . '<br>';
} else {
	echo 'Update SUCCES!';
}

mysql_close($link);

?>
