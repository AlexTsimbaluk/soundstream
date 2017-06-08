<?php

include_once '../db_connection.php';
include_once '../functions.php';


$query = "select distinct station_title from stations";
/*$query = "delete from stations where station_title in (select distinct station_title from stations GROUP BY station_title)";*/

echo '<br>' . $query . '<br>';

$result = mysqli_query($link, $query);

if (!$result) {
	echo '<br>' . mysqli_error($link) . '<br>';
} else {
	echo '<br><br>Update SUCCES!<br><br>';
}

$data = array();
$total = 0;
if(mysqli_num_rows($result) > 0) {
	while ($row = mysqli_fetch_assoc($result)) {
		// $data[] = $row;
		$total++;
	}
} else {
	echo "No entries<br>";
}
echo ('Total: ' . $total);
// d($data);

mysqli_close($link);

