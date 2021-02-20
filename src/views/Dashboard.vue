<template>
	<div class="container-fluid w-100">
		<app-loading :loading="state.dashboardLoading">
			<div class="row justify-content-center">
				<div class="col-3 mb-3">
					<input v-model="state.transientId" min="1" type="number" class="form-control mb-2">
					<div>
						<button class="btn btn-primary" @click="addItem">Add an item dynamically</button>
						<div>
							<input v-model="state.draggable" type="checkbox"> Draggable
							<input v-model="state.resizable" type="checkbox"> Resizable
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<dash-dashboard :id="'dashExample'" class="w-100 overflow-hidden">
						<dash-layout v-for="layout in state.dLayouts" :key="layout.breakpoint" v-bind="layout">
							<dash-item v-for="item in layout.items" :key="item.id" v-bind.sync="item">
								<chart-loader-new class="content" :widget-id="item.id" />
							</dash-item>
						</dash-layout>
					</dash-dashboard>
				</div>
			</div>
			<button class="btn btn-primary position-fixed btn-create-widget" @click="state.openModal = !state.openModal">
				<fa-icon :icon="['fas', 'plus']" />
			</button>
			<widget-modal
				:close-modal="state.closeModal"
				:measurement-ids="state.measurementIds"
				:open-modal="state.openModal"
				@modal-closed="state.openModal = false; state.closeModal = false"
				@create-widget="createWidget" />
		</app-loading>
	</div>
</template>

<script>
import {Dashboard as DashDashboard, DashItem, DashLayout} from 'vue-responsive-dash';
import {computed, onMounted, reactive} from '@vue/composition-api';
import AppLoading from '../components/AppLoading';
import ChartLoaderNew from '../components/ChartLoaderNew';
import WidgetModal from '../components/Dashboard/WidgetModal';

export default {
	name: 'Dashboard',
	components: {
		ChartLoaderNew,
		AppLoading,
		WidgetModal,
		DashDashboard,
		DashLayout,
		DashItem
	},
	props: {
		id: {
			type: Number,
			required: true
		}
	},
	// eslint-disable-next-line max-lines-per-function
	setup(props, {root}) {
		const {axios} = root.$options;
		const state = reactive({
			openModal: false,
			closeModal: false,
			measurementIds: computed(() => state.dashboard.measurements?.map((measurement) => measurement.id) ?? []),
			dashboard: {},
			transientId: 1,
			dashboardLoading: true,
			transient: {},
			transients: [],
			dLayouts: [
				{
					breakpoint: 'lg',
					breakpointWidth: 1200,
					numberOfCols: 12,
					items: []
				},
				{
					breakpoint: 'md',
					breakpointWidth: 996,
					numberOfCols: 10,
					items: []
				},
				{
					breakpoint: 'sm',
					breakpointWidth: 768,
					numberOfCols: 8,
					items: []
				},
				{
					breakpoint: 'xs',
					breakpointWidth: 480,
					numberOfCols: 4,
					items: []
				},
				{
					breakpoint: 'xxs',
					breakpointWidth: 0,
					numberOfCols: 2,
					items: []
				}
			]
		});

		onMounted(() => {
			state.dashboardLoading = true;
			axios.get(`dashboard/${props.id}`)
				.then(({data}) => {
					state.dLayouts.forEach((layout) => {
						layout.items = data.layout[layout.breakpoint];
					});
					state.dashboard = data;
				})
				.catch(() => {
					console.log('get dashboard error');
				})
				.finally(() => {
					state.dashboardLoading = false;
					state.index = state.dLayouts[0].items.length;
				});
		});

		const addItem = () => {
			Object.keys(state.layouts).forEach((key) => {
				state.layouts[key].push({
					x: 0,
					y: state.dLayouts[0].items.length,
					width: 3,
					height: 3,
					transientId: parseInt(state.transientId, 10)
				});
			});
			// Increment the counter to ensure key is always unique.
		};

		const removeItem = (val) => {
			const index = state.layout.map((item) => item.i).indexOf(val);
			state.layout.splice(index, 1);
		};
		const breakpointChangedEvent = (newBreakpoint) => {
			state.layout = state.layouts[newBreakpoint];
		};
		const addWidgetToLayout = (widgetLayout) => {
			state.dLayouts.forEach((layout) => {
				layout.items.push(widgetLayout[layout.breakpoint]);
			});
		};
		const createWidget = (widget) => {
			state.dLayouts.forEach((layout) => {
				widget.widgetLayout[layout.breakpoint] = {
					x: 0,
					y: 0,
					width: 3,
					height: 3,
					id: 0
				};
			});
			widget.dashboardId = state.dashboard.id;
			axios.post('widget/create-widget', widget)
				.then(({data}) => {
					addWidgetToLayout(data.layout);
				});
		};


		return {
			state,
			removeItem,
			addItem,
			breakpointChangedEvent,
			createWidget
		};
	}
};
</script>

<style scoped>
.content {
	background-color: white;
	height: 100%;
	width: 100%;
	border: 2px solid #42b983;
	border-radius: 5px;
}
.btn-create-widget {
	right: 1.5rem;
	bottom: 1.5rem;
}
.container-fluid {
	overflow-x: hidden;
}
</style>
