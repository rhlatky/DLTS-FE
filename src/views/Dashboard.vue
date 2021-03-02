<template>
	<div class="container-fluid w-100">
		<app-loading :loading="state.dashboardLoading">
			<div class="row">
				<div class="col-12">
					<dash-dashboard :id="'dashExample'" class="w-100 overflow-hidden" @currentBreakpointUpdated="state.breakpoint = $event">
						<dash-layout v-for="layout in state.dLayouts" :key="layout.breakpoint" v-bind="layout">
							<dash-item
								v-for="item in layout.items"
								:key="item.id"
								v-bind.sync="item"
								@moveStart="setComparisonLayout"
								@resizeStart="setComparisonLayout"
								@moving="widgetInteractionHandler"
								@resizing="widgetInteractionHandler">
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
import AppLoading from '../components/Design/AppLoading';
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
			dashboardLoading: true,
			widgetInteract: false,
			interactionTimeout: null,
			oldLayout: null,
			breakpoint: '',
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
						layout.items = layout.items.concat(data.layout[layout.breakpoint]);
					});
					state.dashboard = data;
					console.log(state.activeLayout);
				})
				.catch(() => {
					console.log('get dashboard error');
				})
				.finally(() => {
					state.dashboardLoading = false;
				});
		});

		const removeItem = (val) => {
			// TODO: Zavolat api a zmazat
			const index = state.layout.map((item) => item.i).indexOf(val);
			state.layout.splice(index, 1);
		};
		const addWidgetToLayout = (widgetLayout) => {
			state.dLayouts.forEach((layout) => {
				layout.items.push(widgetLayout[layout.breakpoint]);
			});
		};
		const setComparisonLayout = () => {
			if (state.oldLayout === null) {
				state.oldLayout = JSON.parse(JSON.stringify(state.dLayouts.filter((layout) => layout.breakpoint === state.breakpoint)[0]));
			}
		};
		const updateWidgetLayout = (widget) => {
			axios.post('widget/update-widget', {
				id: widget.id,
				breakpoint: state.oldLayout.breakpoint,
				layout: widget
			});
		};
		const widgetInteractionHandler = () => {
			clearTimeout(state.interactionTimeout);
			state.interactionTimeout = setTimeout(() => {
				const [currentLayout] = state.dLayouts.filter((layout) => layout.breakpoint === state.oldLayout.breakpoint);
				if (JSON.stringify(state.oldLayout) === JSON.stringify(currentLayout)) {
					return;
				}
				const changes = [];
				for (let i = 0; i < state.oldLayout.items.length; i++) {
					const widget = currentLayout.items[i];
					if (JSON.stringify(widget) !== JSON.stringify(state.oldLayout.items[i])) {
						changes.push(widget);
					}
				}
				changes.forEach((widget) => {
					updateWidgetLayout(widget);
				});
				state.oldLayout = null;
			}, 1500);
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
			createWidget,
			setComparisonLayout,
			widgetInteractionHandler
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
