<?php

include_once 'db_connection.php';

function d($value = null, $stop = true) {
	echo "<br><br>Debug:<br><br><pre>";
	print_r($value);
	echo "</pre><br><br>Stop<br><br>";
	if($stop) die;
}

function secureData($fieldData) {
	return htmlspecialchars(stripslashes(trim($fieldData)));
}

function dbConnect() {
	$host = "localhost";
	$user = "root";
	$password = "";
	$database = "stations_icecast";

	$link = mysqli_connect($host, $user, $password, $database);
	if(!$link) {
		echo 'Ошибка подключения к MySQL<br>';
		echo mysqli_error($link);
		exit();
	} else {
		// echo 'Connect to MySQL<br>';
	}

	mysqli_set_charset($link, 'utf8');

	if(!mysqli_select_db($link, $database)) {
		echo 'Ошибка доступа подключения к базе данных ' . $database . '<br>';
		exit();
	} else {
		// echo 'Connect to DB<br>';
	}
}

// Получение всех станций текущего плейлиста и его формирование
function getPlaylistStations($arrId) {
	$host = "localhost";
	$user = "root";
	$password = "";
	$database = "stations_icecast";
	$link = mysqli_connect($host, $user, $password, $database);
	if(!$link) {
		echo 'Ошибка подключения к MySQL<br>';
		echo mysqli_error($link);
		exit();
	} else {
	// echo 'Connect to MySQL<br>';
	}
	mysqli_set_charset($link, 'utf8');

	if(!mysqli_select_db($link, $database)) {
		echo 'Ошибка доступа подключения к базе данных ' . $database . '<br>';
		exit();
	}

	$data = array();
	for($i = 0; $i < count($arrId); $i++) {
		$query ="select * from stations where station_id=" . $arrId[$i];
		$result = mysqli_query($link, $query);
		if (!$result) {
			echo mysqli_error($link);
		} else {
		// echo 'Good';
		}
		if(mysqli_num_rows($result) > 0) {
			while ($row = mysqli_fetch_assoc($result)) {
				$data[] = $row;
			}
		} else {
			// echo "No entries";
		}
	}
	$data = json_encode($data);
	echo $data;
	
	/*if(mysql_num_rows($result) > 0) {
		while ($row = mysql_fetch_assoc($result)) {
			$data[] = $row;
		}
		$data = json_encode($data);
		echo $data;
	} else {
		echo "No entries";
	}*/
	mysqli_close($link);
}

// Получение и добавление одной станции в текущий плейлист
function getStation($id) {
	// include_once 'db_connection.php';
	$host = "localhost";
	$user = "root";
	$password = "";
	$database = "stations_icecast";
	$link = mysqli_connect($host, $user, $password, $database);
	if(!$link) {
		echo 'Ошибка подключения к MySQL<br>';
		echo mysqli_error($link);
		exit();
	} else {
	// echo 'Connect to MySQL<br>';
	}
	mysqli_set_charset($link, 'utf8');

	if(!mysqli_select_db($link, $database)) {
		echo 'Ошибка доступа подключения к базе данных ' . $database . '<br>';
		exit();
	}

	$query = "select * from stations where station_id = $id";
	$result = mysqli_query($link, $query);
	$data = array();
	while ($row = mysqli_fetch_assoc($result)) {
		$data[] = $row;
	}
	echo json_encode($data);

	if (!$result) {
		echo mysqli_error($link);
	} else {
		// echo 'GOOD QUERY!';
	}

	mysqli_close($link);
}

// Поиск станций и показ результатов
function searchStation($target) {
	// include_once 'db_connection.php';
	$host = "localhost";
	$user = "root";
	$password = "";
	$database = "stations_icecast";
	$link = mysqli_connect($host, $user, $password, $database);
	if(!$link) {
		echo 'Ошибка подключения к MySQL<br>';
		echo mysqli_error($link);
		exit();
	} else {
	// echo 'Connect to MySQL<br>';
	}
	mysqli_set_charset($link, 'utf8');

	if(!mysqli_select_db($link, $database)) {
		echo 'Ошибка доступа подключения к базе данных ' . $database . '<br>';
		exit();
	}

	$target = secureData($target);
	// $query = "select * from stations where station_title like '" . $target . "' '%';";
	// $query = "select * from stations where station_title like '%'" . $target . "'%' or station_url like '%'" . $target . "'%'";
	$query = "select * from stations where station_title like '%$target%' or station_url like '%$target%'";
	$result = mysqli_query($link, $query);
	$data = array();
	while ($row = mysqli_fetch_assoc($result)) {
		$data[] = $row;
	}
	echo json_encode($data);

	if (!$result) {
		echo mysqli_error($link);
	} else {
		// echo 'GOOD QUERY!';
	}

	mysqli_close($link);
}

// Получение всех станций и показ результатов
function getAllStations() {
	// include_once 'db_connection.php';
	
	$host = "localhost";
	$user = "root";
	$password = "";
	$database = "stations_icecast";
	$link = mysqli_connect($host, $user, $password, $database);
	if(!$link) {
		echo 'Ошибка подключения к MySQL<br>';
		echo mysqli_error($link);
		exit();
	} else {
	// echo 'Connect to MySQL<br>';
	}
	mysqli_set_charset($link, 'utf8');

	if(!mysqli_select_db($link, $database)) {
		echo 'Ошибка доступа подключения к базе данных ' . $database . '<br>';
		exit();
	}

	$query = "select * from stations order by station_id limit 100";
	$result = mysqli_query($link, $query);
	$data = array();

	while ($row = mysqli_fetch_assoc($result)) {
		$data[] = $row;
	}
	
	echo json_encode($data);

	if (!$result) {
		echo mysqli_error($link);
	} else {
		// echo 'GOOD QUERY!';
	}

	mysqli_close($link);
}