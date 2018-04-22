<?php if(false) { ?>	
	<div class="devel">
		<?php
		echo $_SESSION['login'];
		if(isset($_SESSION['login'])) {
			echo '<p>' . $_SESSION['login'] . '</p>';
			echo '<div class="icon">exit_to_app</div>';
		} else {
			echo '<p>You are not authorizated</p>';
			echo '<div class="icon">forward</div>';
		}
		?>

		<?php if(isset($_SESSION['login'])) { ?>
			<label>
				<div class="logout config button btn" title="Logout">
					<div class="iconWrapper">
						<div class="icon">exit_to_app</div>
					</div>
				</div>
			</label>
		<?php } else { ?>
			<label>
				<div class="showFormSign config button btn" data-form=".form-auth" title="Sign">
					<div class="iconWrapper">
						<div class="icon">forward</div>
					</div>
				</div>
			</label>
		<?php } ?>
	</div>
<?php } ?>

<?php if(false) { ?>
	<div class="devel overflow-y mCustomScrollbar">
		<div class="symbols">
			<input type="text" class="before-decode form-control">
			<p class="after-decode"></p>
		</div>
	</div>
<?php } ?>