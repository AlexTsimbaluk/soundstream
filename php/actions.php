<?php

include_once 'db_connection.php';
include_once 'functions.php';

// Получение станций текущего плейлиста и его формирование
if ($_POST['action'] == "getPlaylistStations" && !empty($_POST['id'])) {
	getPlaylistStations($_POST['id']);
}

// Получение и добавление одной станции в текущий плейлист
if ($_POST['action'] == "getStation" && !empty($_POST['id'])) {
	getStation($_POST['id']);
}

// Поиск станций и показ результатов
if ($_POST['action'] == "search" && !empty($_POST['target'])) {
	searchStation($_POST['target']);
}

// Получение всех станций и показ результатов
if ($_POST['action'] == "getAllStations") {
	getAllStations();
}