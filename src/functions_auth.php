<?php

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
} else {
	// echo 'Connect to DB<br>';
}

function d($value = null, $stop = true) {
	echo "<br><br>Debug:<br><br><pre>";
	print_r($value);
	echo "</pre><br><br>Stop<br><br>";

	if($stop) die;
}

function secureData($fieldData) {
	return htmlspecialchars(stripslashes(trim($fieldData)));
}

function getSalt() {
	$salt = '';
	$saltLength = 8; //длина соли
	for($i=0; $i<$saltLength; $i++) {
		$salt .= chr(mt_rand(33, 126)); //символ из ASCII-table
	}
	return $salt;
}

function addUser($login, $password) {
	// include_once 'db_connection.php';
	$host = "localhost";
	$user = "root";
	$password_db = "";
	$database = "stations_icecast";

	$link = mysqli_connect($host, $user, $password_db, $database);
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

	$login = secureData($login);
	$salt = getSalt();
	$password = md5(secureData($password) . $salt);
	$now = date("d.m.Y H:i:s");

	$query = "insert into `users` (`user_login`, `user_password`, `user_salt`, `user_reg_date`) 
			VALUES ('".$login."','"
					  .$password."','"
					  .$salt."','"
					  .$now."');";
	$result = mysqli_query($link, $query);
	if (!$result) {
		echo mysqli_error($link);
	} else {
		echo 'GOOD QUERY!';
	}

	mysqli_close($link);
}

	// include_once 'db_connection.php';
function authUser($login, $password) {
	$host = "localhost";
	$user = "root";
	$password_db = "";
	$database = "stations_icecast";

	$link = mysqli_connect($host, $user, $password_db, $database);
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

	$login = secureData($login);
	// $password = secureData($password);
	// $salt = getSalt();
	// $password = md5(secureData($password) . $salt);
	$now = date("d.m.Y H:i:s");

	$query = "select * from `users` where `user_login` like '".$login."';";
	$result = mysqli_query($link, $query);

	$user = mysqli_fetch_assoc($result);
	// d($user);
	if(!empty($user)) {
		$salt = $user["user_salt"];
		// echo $salt . '<br>';
		$password = md5(secureData($password) . $salt);
		// echo $password . '<br>' . $user['user_password'];
		// echo $user['user_password'];
		if($user['user_password'] == $password) {
			session_start(); 
			$_SESSION['auth'] = true;
			$_SESSION['id'] = $user['user_id']; 
			$_SESSION['login'] = $user['user_login'];
			echo json_encode($user);
			// d($user);
		} else {
			
		}
		
	} else {

	}
	if (!$result) {
		echo mysqli_error($link);
	} else {
		
	}

	mysqli_close($link);
}

/*function getUsersList() {

	$data = array();
	$query ="select * from users order by user_id desc";
	$result = mysql_query($query);
	if (!$result) {
		echo mysqli_error($link) . '<br>';
	} else {
		// echo 'Good';
	}
	if(mysql_num_rows($result) > 0) {
		while ($row = mysqli_fetch_assoc($result)) {
			$data[] = $row;
		}
		$data = json_encode($data);
		echo $data;
	} else {
		echo "No entries";
	}

	mysqli_close($link);
}*/


function fieldUnique($field) {
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
	} else {
		// echo 'Connect to DB<br>';
	}

	$field = secureData($field);
	$query = "select `user_login` from `users` where `user_login` like '".$field."';";
	$result = mysqli_query($link, $query);
	$data = array();
	while ($row = mysqli_fetch_assoc($result)) {
		$data[] = $row;
	}
	if(count($data) > 0) {
		echo json_encode($data);	
	} else {
		echo '';
	}
	

	if (!$result) {
		echo mysqli_error($link);
	} else {
		// echo 'GOOD QUERY!';
	}
	mysqli_close($link);
}

function loginIsFree($login) {
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
	} else {
		// echo 'Connect to DB<br>';
	}

	$login = secureData($login);
	$query = "select `user_login` from `users` where `user_login` like '".$login."' '%';";
	$result = mysqli_query($link, $query);

	if (empty(mysqli_fetch_assoc($result))) {
		// echo mysqli_error($link);
		echo 'true';
	} else {
		echo 'false';
	}
	mysqli_close($link);
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
	$result = mysqli_query($link, $query);

	if (!$result) {
		echo mysqli_error($link);
	} else {
		echo 'GOOD QUERY!';
	}

	$data = array();
	$query ="select * from comments order by comment_date DESC limit 1";
	$result = mysqli_query($link, $query);
	while ($row = mysqli_fetch_assoc($result)) {
		$data[] = $row;
	}
	echo json_encode($data);

	mysqli_close($link);
}*/


/*function deleteEntry($action, $moduleName, $entryId) {
	include_once 'db_connection.php';
	
	$query = "delete from $moduleName where comment_id = $entryId";
	$result = mysqli_query($link, $query);

	if (!$result) {
		echo mysqli_error($link);
	}
	else {
		// echo 'GOOD QUERY!';
	}

	mysqli_close($link);
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
	$result = mysqli_query($link, $query);
	if (!$result) {
		echo mysqli_error($link);
	} else {
		// echo 'Good';
	}
	if(mysql_num_rows($result) > 0) {
		while ($row = mysqli_fetch_assoc($result)) {
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
	$result = mysqli_query($link, $query);
	while ($row = mysqli_fetch_assoc($result)) {
		$data[] = $row;
	}
	echo json_encode($data);
	
	if (!$result) {
		echo mysqli_error($link);
	}

	mysqli_close($link);
}*/


?>