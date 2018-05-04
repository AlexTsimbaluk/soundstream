<?php

require_once './db_connection.php';
require_once './functions.php';

/*
* Registraiton & Authorization
*/
if ($_POST['action'] == 'loginUniq' && !empty($_POST['regLogin'])) {
	loginUniq($_POST['regLogin']);
}

// Регистрация нового пользователя
if ($_POST['action'] == 'regUser' && !empty($_POST['regLogin']) && !empty($_POST['regPass'])) {
	regUser($_POST['regLogin'], $_POST['regPass']);
}

// Авторизация пользователя
if ($_POST['action'] == 'authUser' && !empty($_POST['authLogin']) && !empty($_POST['authPass'])) {
	authUser($_POST['authLogin'], $_POST['authPass']);
}

// Logout
if ($_POST['action'] == 'logout') {
	logout();
}


// Получение станций текущего плейлиста и его формирование
if ($_POST['action'] == 'getPlaylistStations' && !empty($_POST['id'])) {
	getPlaylistStations($_POST['id']);
}

// Получение и добавление одной станции в текущий плейлист
if ($_POST['action'] == 'getStation' && !empty($_POST['id'])) {
	getStation($_POST['id']);
}

// Поиск станций и показ результатов
if ($_POST['action'] == 'search' && !empty($_POST['target'])) {
	searchStation($_POST['target']);
}

// Получение всех станций и показ результатов
if ($_POST['action'] == 'getAllStations') {
	getAllStations();
}

// Уникальное посещение
if ($_POST['action'] == 'addVisit'
		&& !empty($_POST['cookie'])
		&& !empty($_POST['useragent'])
		&& !empty($_POST['platform'])
		&& !empty($_POST['screensize'])
		&& !empty($_POST['browsersize'])
		&& !empty($_POST['timeonsite'])) {

	$visit = [
		'cookie' 			=> $_POST['cookie'],
		'useragent' 		=> $_POST['useragent'],
		'platform' 			=> $_POST['platform'],
		'screensize' 		=> $_POST['screensize'],
		'browsersize'		=> $_POST['browsersize'],
		'timeonsite'		=> $_POST['timeonsite']
	];


	addUniqVisit($visit);
}

// Не уникальное посещение
if ($_POST['action'] == 'addHit'
		&& !empty($_POST['cookie'])
		&& !empty($_POST['timeonsite'])) {

	$hit = [
		'cookie' 		=> $_POST['cookie'],
		'timeonsite'	=> $_POST['timeonsite']
	];


	addHit($hit);
}

// Проверка на уникальность за сегодня
if ($_POST['action'] == 'checkUniqToday' && !empty($_POST['cookie'])) {
	checkUniqToday($_POST['cookie']);
}


if ($_POST['admin'] == 1) {
	include_once 'layouts/admin.php';
}

// сохраняем все состояние в файл
if ($_POST['action'] == 'configToFile' && !empty($_POST['config'])) {
	configToFile($_POST['config']);
}
