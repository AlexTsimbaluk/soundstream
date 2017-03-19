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

function addUser($login, $password) {
	include_once 'db_connection.php';
	/*$host = "localhost";
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
	}*/

	$login = secureData($login);
	$password = md5(secureData($password));
	$now = date("d.m.Y H:i:s");
	$query = "insert into `users` (`user_login`, `user_password`, `user_reg_date`) 
			VALUES ('".$login."','"
					  .$password."','"
					  .$now."');";
	/*$result = mysqli_query($link, $query);
	if (!$result) {
		echo mysqli_error($link);
	} else {
		echo 'GOOD QUERY!';
	}

	mysqli_close($link);*/
	$result = mysql_query($query);
	if (!$result) {
		echo mysql_error();
	} else {
		echo 'GOOD QUERY!';
	}

	mysql_close($link);
}

/*function getUsersList() {

	$data = array();
	$query ="select * from users order by user_id desc";
	$result = mysql_query($query);
	if (!$result) {
		echo mysql_error() . '<br>';
	} else {
		// echo 'Good';
	}
	if(mysql_num_rows($result) > 0) {
		while ($row = mysql_fetch_assoc($result)) {
			$data[] = $row;
		}
		$data = json_encode($data);
		echo $data;
	} else {
		echo "No entries";
	}
}*/


function fieldUnique($field) {
	include_once 'db_connection.php';

	$field = secureData($field);
	$query = "select `user_login` from `users` where `user_login` like '".$field."' '%';";


	/*$result = mysqli_query($link, $query);
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
	mysqli_close($link);*/


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


/*function addComment($comment, $name) {
	include_once 'db_connection.php';
	
	$comment = secureData($comment);
	$name = secureData($name);
	$now = date("d.m.Y H:i:s");
	$query = "insert into `comments` (`comment_content`, `comment_signature`, `comment_date`) 
			VALUES ('".$comment."','"
					  .$name."','"
					  .$now."');";
	$result = mysql_query($query);

	if (!$result) {
		echo mysql_error();
	} else {
		echo 'GOOD QUERY!';
	}

	$data = array();
	$query ="select * from comments order by comment_date DESC limit 1";
	$result = mysql_query($query);
	while ($row = mysql_fetch_assoc($result)) {
		$data[] = $row;
	}
	echo json_encode($data);

	mysql_close($link);
}*/


/*function deleteEntry($action, $moduleName, $entryId) {
	include_once 'db_connection.php';
	
	$query = "delete from $moduleName where comment_id = $entryId";
	$result = mysql_query($query);

	if (!$result) {
		echo mysql_error();
	}
	else {
		// echo 'GOOD QUERY!';
	}

	mysql_close($link);
}*/


/*function getPageEntries($count, $page) {
	$count = 5; // Количество записей на странице
	$page = $_GET["page"]; // Узнаём номер страницы
	$shift = $count * ($page - 1); // Смещение в LIMIT. Те записи, порядковый номер которого больше этого числа, будут выводиться.
	$result_set = $mysqli->query("SELECT * FROM `articles` LIMIT $shift, $count"); // Делаем выборку $count записей, начиная с $shift + 1.
}*/


/*function getCommentsList() {

	$data = array();
	$query ="select * from comments order by comment_id desc";
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
		$data = json_encode($data);
		echo $data;
	} else {
		echo "No entries";
	}
}*/

/*function getLastEntry() {
	include_once 'db_connection.php';

	$data = array();
	$query ="select * from comments order by comment_id desc limit 1";
	$result = mysql_query($query);
	while ($row = mysql_fetch_assoc($result)) {
		$data[] = $row;
	}
	echo json_encode($data);
	
	if (!$result) {
		echo mysql_error();
	}

	mysql_close($link);
}*/


?>