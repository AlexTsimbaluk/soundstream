<?php

require_once 'db_connection.php';

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

// Выполнить sql-запрос
function makeSQL($query) {
	global $link;
	$response = '';

	// echo '<br>' . $query . '<br>';

	$result = mysqli_query($link, $query);

	if (!$result) {
		// echo '<br>' . mysqli_error($link) . '<br>';
		$response = mysqli_error($link);
	} else {
		// echo '<br><br>Update SUCCES!<br><br>';
		$response = 'Update SUCCES!';
	}

	$data = [
		'query'  => $query,
		'result' => $response
	];

	$data = json_encode($data);
	echo $data;

	mysqli_close($link);
}


// Получение всех станций текущего плейлиста и его формирование
function getPlaylistStations($arrId) {
	global $link;

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
			// $data[] = "No entries";
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
	global $link;

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
	global $link;

	$target = secureData($target);
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
	global $link;

	// $query = "select * from stations order by station_id limit 100";
	$query = "select * from stations order by station_id";
	$result = mysqli_query($link, $query);
	$data = array();

	while ($row = mysqli_fetch_assoc($result)) {
		$key = $row['station_id'];
		$data[$key] = $row;
	}
	echo json_encode($data);

	if (!$result) {
		echo mysqli_error($link);
	} else {
		// echo 'GOOD QUERY!';
	}

	mysqli_close($link);
}

// Проверка на уникальность за сегодня 
function checkUniqToday($uniqHash) {

	global $link;

	$today = date("d");

	$query = "select * from visits where visit_date like '" . $today . "%' 
									and visit_cookie like '%$uniqHash%'";

	$result = mysqli_query($link, $query);

	$data = array();
	while ($row = mysqli_fetch_assoc($result)) {
		$data[] = $row;
	}
	echo json_encode($data);

	if (!$result) {
		// echo mysqli_error($link);
	} else {
		
	}

	mysqli_close($link);

}

// Уникальное посещение
function addUniqVisit($visit) {

	global $link;

	$now = date("d.m.Y H:i:s");

	$salt ='';

	$query = "insert into `visits` (`visit_cookie`,
									`visit_ip`,
									`visit_ref`,
									`visit_useragent`,
									`visit_platform`,
									`visit_screensize`,
									`visit_browsersize`,
									`visit_timeonsite`,
									`visit_date`) 
							VALUES ('".$visit['cookie']."','"
									  .ip2long($_SERVER["REMOTE_ADDR"])."','"
									  .$_SERVER["HTTP_REFERER"]."','"
									  .$visit['useragent']."','"
									  .$visit['platform']."','"
									  .$visit['screensize']."','"
									  .$visit['browsersize']."','"
									  .$visit['timeonsite']."','"
									  .$now."');";


	$result = mysqli_query($link, $query);
	if (!$result) {
		echo mysqli_error($link);
	} else {
		echo 'GOOD QUERY!';
	}

	mysqli_close($link);

}

// Не уникальное посещение
function addHit($hit) {

	global $link;

	$now = date("d.m.Y H:i:s");

	$salt ='';

	$query = "insert into `hits` (`hit_cookie`,
									`hit_timeonsite`,
									`hit_date`) 
							VALUES ('".$hit['cookie']."','"
									  .$hit['timeonsite']."','"
									  .$now."');";


	$result = mysqli_query($link, $query);
	if (!$result) {
		echo mysqli_error($link);
	} else {
		echo 'GOOD QUERY!';
	}

	mysqli_close($link);

}



/*
* Registration & Authorization
*/
function loginUniq($field) {
	global $link;

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

function regUser($login, $password) {
	global $link;

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
		// echo 'GOOD QUERY!';
	}

	mysqli_close($link);
}

function authUser($login, $password) {
	global $link;

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
			// session_start();
			$_SESSION['auth'] = true;
			$_SESSION['id'] = $user['user_id']; 
			$_SESSION['login'] = $user['user_login'];
			// echo $_SESSION['login'];

			// if ( !empty($_REQUEST['remember']) and $_REQUEST['remember'] == 1 ) {
				$key = getSalt(); //назовем ее $key

				//Пишем куки (имя куки, значение, время жизни - сейчас+месяц)
				setcookie('user_login', $user['user_login'], time()+ 60 * 60 * 24 * 30); //логин
				setcookie('user_key', $key, time()+ 60 * 60 * 24 * 30); //случайная строка

				$query = 'update `users` set `user_cookie`="'.$key.'" WHERE `user_login`="'.$login.'"';
				$result = mysqli_query($link, $query);

				$user['user_cookie'] = $key;

				if (!$result) {
					echo mysqli_error($link);
				} else {
					// echo 'GOOD QUERY!';
				}
			// }

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

// Logout
function logout() {
	global $link;

	session_start();
	unset($_SESSION['auth']);
	unset($_SESSION['id']);
	unset($_SESSION['login']);
	session_destroy();

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




/*function loginIsFree($login) {
	global $link;

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
}*/


// сохраняем все сосояние в файл
function configToFile($config) {
	global $link;

	// в этот файл запишем сосотояние
	$file = '__config.txt';
	// Открываем файл для получения существующего содержимого
	// $current = file_get_contents($file);
	// Добавляем нового человека в файл
	// $current .= "John Smith\n";
	// Пишем содержимое обратно в файл
	// file_put_contents($file, $current);
	// echo json_encode($config);
	// echo ($config);

	file_put_contents($file, ($config));

	/*$query = "select * from stations order by station_id";
	$result = mysqli_query($link, $query);
	$data = array();

	while ($row = mysqli_fetch_assoc($result)) {
		$key = $row['station_id'];
		$data[$key] = $row;
	}
	echo json_encode($data);

	if (!$result) {
		echo mysqli_error($link);
	} else {
		// echo 'GOOD QUERY!';
	}*/

	mysqli_close($link);
}