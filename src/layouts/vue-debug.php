<!-- <div class="vue-debug hidden"> -->
<div class="vue-debug">
	<!-- <div class="vmPlaylistsPanel">
		<div
			class="playlist sortable flex left"
			data-name="Default"
			data-scroll-left="0"
			data-current="1"
			v-for="playlist in playlistsOrder"
		>
			<div class="vmDelete size-4">x</div>
	
			<div class="vmTitle grow-1">
				{{ playlist }}
			</div>
	
			<div class="vmEdit size-4">...</div>
		</div>
	</div> -->

	<!-- <div class="vmPlayer">
		{{ playingTrack }}
	</div> -->

	<?php
	if($_SESSION['auth']) {
		echo '<p>' . $_SESSION['login'] . '</p>';
	} else {
		echo '<p>You are not authorizated</p>';
	}
	?>

	<?php if($_SESSION['auth']) { ?>
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