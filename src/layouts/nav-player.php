<nav class="nav nav-admin">
	<ul>
        <!-- <li class="adminItem"><a class="toPlayer" href="">A</a></li> -->
		<li class="adminItem"><a class="toAdmin" href="">Admin</a></li>
		<!-- <li class="adminItem"><a class="clearLocalStorage" href="">Clear</a></li> -->
		<!-- <li class="adminItem"><a class="clearUniqHash" href=""></a>Reset</li> -->
		<li class="adminItem resetLocalStorage btn-group" title="Reset">
			<a href="" type="button" class="resetItem btn btn-danger">Reset</a>
			<button class="changeItem" type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<span class="caret"></span>
			</button>
			
			<ul class="resetItemList dropdown-menu"></ul>
		</li>
		<li class="adminItem"><a class="runSql" href="/sql/db_queries.php">SQL</a></li>
	</ul>
</nav>


