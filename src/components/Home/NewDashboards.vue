<template>
	<div class="card h-100">
		<div class="card-body">
			<div class="d-inline-flex w-100 justify-content-between">
				<h5>My Dashboards</h5>
				<button
					data-bs-toggle="modal"
					data-bs-target="#create-dashboard-modal"
					class="btn btn-sm btn-primary">
					Create new
				</button>
			</div>
			<app-loading :loading="state.loading">
				<table class="table table-striped table-borderless table-sm table-hover mt-2">
					<thead>
						<tr>
							<th>Name</th>
							<th>Owner</th>
							<th>widgetCount</th>
							<th>Created</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="dashboard in state.dashboards" :key="dashboard.id">
							<td>{{ dashboard.name }}</td>
							<td>{{ dashboard.owner }}</td>
							<td>{{ dashboard.widgetCount }}</td>
							<td>{{ dashboard.creationTime }}</td>
							<td>
								<button class="btn btn-secondary">open</button>
							</td>
						</tr>
					</tbody>
				</table>
			</app-loading>
		</div>
		<div
			id="create-dashboard-modal"
			class="modal fade"
			tabindex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Create new dashboard</h5>
						<button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close" />
					</div>
					<div class="modal-body">
						<div class="mb-3">
							<input v-model="state.name" type="text" placeholder="Dashboard name" class="form-control">
						</div>
						<div class="mb-3">
							<input v-model="state.measurementId" type="number" min="0" class="form-control">
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="create-dashboard-modal">Cancel</button>
						<button type="button" class="btn btn-primary" @click="createDashboard">Create</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {onMounted, onUnmounted, reactive} from '@vue/composition-api';
import AppLoading from '../AppLoading';

export default {
	name: 'NewDashboards',
	components: {AppLoading},
	setup(props, {root}) {
		const {axios} = root.$options;
		let createDashboardModal = null;
		const state = reactive({
			name: '',
			measurementId: 1,
			private: false,
			dashboards: {},
			loading: false
		});

		onMounted(() => {
			state.loading = true;
			axios.get('dashboard')
				.then(({data}) => {
					state.dashboards = data;
				})
				.catch(() => {
					console.log('dashboards error');
				})
				.finally(() => {
					state.loading = false;
				});

			createDashboardModal = document.getElementById('create-dashboard-modal');
			createDashboardModal.addEventListener('hidden.bs.modal', () => {
				state.dashboardName = '';
				state.measurementId = 1;
			});
		});
		onUnmounted(() => {
			createDashboardModal.removeEventListener('hidden.bs.modal', () => {
				state.dashboardName = '';
				state.measurementId = 1;
			});
		});

		const createDashboard = () => {
			axios.post('dashboard/create-dashboard', {
				name: state.name,
				measurementId: state.measurementId
			})
				.then(({data}) => {
					console.log(data);
				})
				.catch((error) => {
					console.log(error);
				});
		};

		return {
			state,
			createDashboardModal,
			createDashboard
		};
	}
};
</script>

<style scoped>

</style>
