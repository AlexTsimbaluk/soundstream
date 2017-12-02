<div class="vue-debug">
	<div class="vmPlaylistsPanel">
		<div
			class="playlist sortable"
			data-name="Default"
			data-scroll-left="0"
			data-current="1"
			v-for="playlist in playlistsOrder"
		>
			{{ playlist }}
		</div>
	</div>
</div>