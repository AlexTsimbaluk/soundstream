<?php

include_once '../db_connection.php';
include_once '../functions.php';

/*if (!empty($_POST['comment']) && !empty($_POST['name'])) {
	addComment($_POST['comment'], $_POST['name']);
}*/

if ($_GET['module'] == "users" && $_GET['view'] == "list") {
	
	getUsersList();
}

/*if ($_GET['entry'] == "lastAdded") {
	getLastEntry();
}

if ($_POST['action'] == "delete" && $_POST['moduleName'] == "comments" && !empty($_POST['entryId'])) {
	$entryId = (int)$_POST['entryId'];
	deleteEntry($_POST['action'], $_POST['moduleName'], $entryId);
}*/

mysql_close($link);

