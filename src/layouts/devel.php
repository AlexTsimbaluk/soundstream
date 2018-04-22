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
	<div class="devel ">
		<div class="symbols flex top h-fill">
			<div class="shrink-1">
				<input type="text" class="before-decode form-control">
			</div>

			<div class="grow-1 size-12">
				<div class="after-decode mCustomScrollbar h-fill"></div>

				<button class="clearSymbols">
					<div class="icon">not_interested</div>
				</button>
			</div>
		</div>
	</div>
<?php } ?>