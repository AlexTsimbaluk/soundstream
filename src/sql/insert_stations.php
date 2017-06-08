<?php

include_once '../db_connection.php';
include_once '../functions.php';
include_once './icecast.php';

$stationsArr = array();
$stationParam = array();

$stationsArr = explode('&&&', $stationsStr);

for ($i=0; $i < count($stationsArr); $i++) { 
	// echo $stationsArr[$i] . '<br>';
	$stationParam[] = explode(' *-*', $stationsArr[$i]);
	// $stationArr[$i] = explode(' *-*', $stationsArr[$i]);
}

include_once '../db_connection.php';
set_time_limit(0);
$good = $bad = 0;

$start = microtime(true);
for ($i = 0; $i < count($stationParam); $i++) {
	/*if($i > 0) {
		if($stationParam[$i][0] == $stationParam[$i - 1][0]) {
			continue;
		}
	}*/
	$query = "insert into stations_temp (station_title, station_url) 
		VALUES ('".$stationParam[$i][0]."','"
				  .$stationParam[$i][1]."');";

	
	$result = mysqli_query($link, $query);
	if (!$result) {
		echo mysqli_error($link) . '<br>';
		$bad++;
	} else {
		// echo 'GOOD QUERY!<br>';
		$good++;
	}
}
echo '<br><br><br><br>Время импорта: '.(microtime(true) - $start).' сек.';

echo 'Total stations imported: ' . count($stationParam) . '<br>';
echo 'Success import: ' . $good . '<br>';
echo 'Error import: ' . $bad . '<br>';

mysqli_close($link);