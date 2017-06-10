<?php
    include_once 'layouts/nav-admin.php';
?>

<section id="admin">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-6">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<!-- Создать таблицу -->
						Create table
					</div>

					<div class="panel-body">
						<div class="form-group">
						<label for="exampleInputEmail1">Change tables's name</label>
							<select class="form-control" name="create-table">
								<option value="stations">Stations</option>
								<option value="users">Users</option>
								<option value="visits">Visits</option>
								<option value="hits">Hits</option>
							</select>
						</div>
					</div>

					<div class="panel-footer text-right">
						<button class="btn btn-success js-create-table" data-sql="create_table" data-sql-value="[name=create-table]" type="submit">Create</button>
					</div>
				</div>
			</div>

			<div class="col-md-6">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<!-- Создать таблицу -->
						Delete table
					</div>

					<div class="panel-body">
						<div class="form-group">
						<label for="exampleInputEmail1">Change tables's name</label>
							<select class="form-control" name="drop-table">
								<option value="users">Users</option>
								<option value="visits">Visits</option>
								<option value="hits">Hits</option>
								<option value="stations">Stations</option>
							</select>
						</div>
					</div>

					<div class="panel-footer text-right">
						<button class="btn btn-success js-drop-table" data-sql="drop_table" data-sql-value="[name=drop-table]" type="submit">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<div class="modal fade" id="sqlResponse" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">SQL</h4>
			</div>
			<div class="modal-body">
				
			</div>
		</div>
	</div>
</div>
