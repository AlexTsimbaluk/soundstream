<?php

include_once 'db_connection.php';
include_once 'functions.php';

// Получение всех станций
if ($_POST['action'] == "initUrlList") {
	getStationsList();
}

// Получение одной станции
if ($_POST['action'] == "getStation" && !empty($_POST['id'])) {
	getStation($_POST['id']);
}

// Поиск
if ($_POST['action'] == "find" && !empty($_POST['target'])) {
	searchStation($_POST['target']);
}