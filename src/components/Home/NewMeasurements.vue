<template>
	<div class="card h-100">
		<div class="card-body">
			<div class="d-inline-flex w-100 justify-content-between">
				<h5>Latest measurements</h5>
				<button class="btn btn-sm btn-primary">To measurements</button>
			</div>
			<app-loading :loading="state.loading">
				<table class="table table-striped table-borderless table-sm table-hover mt-2">
					<thead>
						<tr>
							<th>Name</th>
							<th>IVs</th>
							<th>CVs</th>
							<th>Tempscans</th>
							<th>Transients</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="measurement in state.measurements" :key="measurement.id">
							<td>{{ measurement.name }}</td>
							<td>{{ measurement.ivCount }}</td>
							<td>{{ measurement.cvCount }}</td>
							<td>{{ measurement.tempscanCount }}</td>
							<td>{{ measurement.transientCount }}</td>
						</tr>
					</tbody>
				</table>
			</app-loading>
		</div>
	</div>
</template>

<script>
import {onMounted, reactive} from '@vue/composition-api';
import AppLoading from '../AppLoading';

export default {
	name: 'NewMeasurements',
	components: {AppLoading},
	setup(props, {root}) {
		const {axios} = root.$options;
		const state = reactive({
			measurements: [],
			loading: false
		});
		onMounted(() => {
			state.loading = true;
			axios.get('measurement')
				.then(({data}) => {
					state.measurements = data;
				})
				.catch(() => {
					console.log('measurements error');
				})
				.finally(() => {
					state.loading = false;
				});
		});
		return {
			state
		};
	}
};
</script>

<style scoped>

</style>
