<?php

include_once 'db_connection.php';
include_once 'functions_auth.php';

if (!empty($_POST["regLogin"]) && $_POST["action"] == "unique") {
	fieldUnique($_POST["regLogin"]);
}

/*if (!empty($_POST["value"]) && $_POST["action"] == "loginIsFree") {
	loginIsFree($_POST["value"]);
}*/

// Регистрация нового пользователя
if (!empty($_POST["regLogin"]) && !empty($_POST["regPass"])) {
	addUser($_POST["regLogin"], $_POST["regPass"]);
}

// Авторизация пользователя
if (!empty($_POST["authLogin"]) && !empty($_POST["authPass"])) {
	authUser($_POST["authLogin"], $_POST["authPass"]);
}

mysqli_close($link);

?>