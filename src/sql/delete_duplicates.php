<?php

include_once '../db_connection.php';
include_once '../functions.php';


$query = "select distinct station_title from stations";
echo $query . '<br>';

$result = mysql_query($query);

if (!$result) {
	echo '<br>' . mysql_error() . '<br>';
} else {
	echo '<br><br>Update SUCCES!<br><br>';
}

$data = array();
if(mysql_num_rows($result) > 0) {
	while ($row = mysql_fetch_assoc($result)) {
		$data[] = $row;
	}
} else {
	echo "No entries";
}
echo count($data);
d($data);

mysql_close($link);

?>
