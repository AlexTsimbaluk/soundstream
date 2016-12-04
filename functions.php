<?php

function d($value = null, $stop = true) {
	echo "<br><br>Debug:<br><br><pre>";
	print_r($value);
	echo "</pre><br><br>Stop<br><br>";

	if($stop) die;
}

function secureData($fieldData) {
	return htmlspecialchars(stripslashes(trim($fieldData)));
}

function getStationsList($arrId) {

	$data = array();
	for($i = 0; $i <count($arrId); $i++) {
		$query ="select * from stations where station_id=" . $arrId[$i];
		// echo $query . ', ';
		$result = mysql_query($query);
		if (!$result) {
			echo mysql_error();
		} else {
		// echo 'Good';
		}
		if(mysql_num_rows($result) > 0) {
			while ($row = mysql_fetch_assoc($result)) {
				$data[] = $row;
			}
		} else {
			echo "No entries";
		}
	}
	$data = json_encode($data);
	// d($data);
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
}

function searchStation($target) {
	include_once 'db_connection.php';

	$target = secureData($target);
	// $query = "select * from stations where station_title like '" . $target . "' '%';";
	// $query = "select * from stations where station_title like '%'" . $target . "'%' or station_url like '%'" . $target . "'%'";
	$query = "select * from stations where station_title like '%$target%' or station_url like '%$target%'";
	$result = mysql_query($query);
	$data = array();
	while ($row = mysql_fetch_assoc($result)) {
		$data[] = $row;
	}
	echo json_encode($data);

	if (!$result) {
		echo mysql_error();
	} else {
		// echo 'GOOD QUERY!';
	}

	mysql_close($link);
}

function getStation($id) {
	include_once 'db_connection.php';

	$query = "select * from stations where station_id = $id";
	$result = mysql_query($query);
	$data = array();
	while ($row = mysql_fetch_assoc($result)) {
		$data[] = $row;
	}
	echo json_encode($data);

	if (!$result) {
		echo mysql_error();
	} else {
		// echo 'GOOD QUERY!';
	}

	mysql_close($link);
}