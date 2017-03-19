<?php

include_once 'db_connection.php';
include_once 'functions_auth.php';

if (!empty($_POST["regLogin"]) && $_POST["action"] == "unique") {
	fieldUnique($_POST["regLogin"]);
}

if (!empty($_POST["regLogin"]) && !empty($_POST["regPass"])) {
	addUser($_POST["regLogin"], $_POST["regPass"]);
}

mysql_close($link);
// mysqli_close($link);

?>