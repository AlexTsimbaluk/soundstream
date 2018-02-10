<nav class="nav nav-admin">
	<ul class="main-nav h-fill">
		<li class="adminItem">
			<button class="nav-btn toAdmin">Admin</button>
		</li>

		<li class="adminItem adminConsole">
			<button class="nav-btn btn showConsole">
				<div class="icon">bug_report</div>
			</button>
		</li>

		<li class="adminItem debugLsProp btn-group" data-debug="remove" data-remove="prop" title="Reset">
			<button type="button" class="nav-btn removeItem">Reset</button>
			<button type="button" class="nav-btn btn changeItem dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<span class="caret"></span>
			</button>
			
			<ul class="removeItemList dropdown-menu"></ul>
		</li>

		<li class="adminItem debugLsItem btn-group" data-debug="remove" data-remove="item" title="Clear">
			<button class="nav-btn removeItem">Clear</button>
			<button type="button" class="nav-btn btn changeItem dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<span class="caret"></span>
			</button>
			
			<ul class="removeItemList dropdown-menu"></ul>
		</li>
	</ul>
</nav>


