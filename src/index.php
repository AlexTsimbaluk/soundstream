<?php
	include_once 'layouts/head.php';
?>	

	
<?php
	if(isset($_GET['admin'])) {
		include_once 'layouts/admin.php';
	} else {
		include_once 'layouts/player.php';
	}
?>	

	
<?php
	include_once 'layouts/footer.php';
?>	