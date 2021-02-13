<template>
	<div class="container-fluid w-100">
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
		<div v-if="state.transientLoading" class="d-flex justify-content-center">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		<p v-else>
			{{ state.transient }}
		</p>
		<grid-layout
			:layout.sync="state.layout"
			:col-num="12"
			:row-height="30"
			:is-draggable="state.draggable"
			:is-resizable="state.resizable"
			:vertical-compact="true"
			:use-css-transforms="true">
			<grid-item
				v-for="item in state.layout"
				:key="item.i"
				:static="item.static"
				:x="item.x"
				:y="item.y"
				:w="item.w"
				:h="item.h"
				:i="item.i">
				<chart-loader :transient-id="item.transientId" />
				<span class="remove" @click="removeItem(item.i)">x</span>
			</grid-item>
		</grid-layout>
		<button class="btn btn-primary position-fixed btn-create-widget">+</button>
	</div>
</template>

<script>
import {GridItem, GridLayout} from 'vue-grid-layout';
import {onMounted, reactive} from '@vue/composition-api';
import ChartLoader from '../components/ChartLoader';

export default {
	name: 'Dashboard',
	components: {
		ChartLoader,
		GridLayout,
		GridItem
	},
	props: {
		id: {
			type: Number,
			required: true
		}
	},
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const state = reactive({
			transientId: 1,
			transientLoading: false,
			dashboardLoading: true,
			transient: {},
			transients: [],
			layout: [
				{
					x: 0,
					y: 10,
					w: 6,
					h: 10,
					i: 0,
					transientId: 1,
					moved: false
				}
			],
			draggable: true,
			resizable: true,
			index: 0
		});

		const itemTitle = function(item) {
			let result = item.i;
			if (item.static) {
				result += ' - Static';
			}
			return result;
		};

		const addItem = function() {
			state.layout.push({
				x: (state.layout.length * 2) % (state.colNum || 12),
				y: state.layout.length + (state.colNum || 12),
				w: 3,
				h: 8,
				i: `${state.index}`,
				transientId: parseInt(state.transientId, 10)
			});
			// Increment the counter to ensure key is always unique.
			state.index += 1;
		};

		const removeItem = function(val) {
			const index = state.layout.map((item) => item.i).indexOf(val);
			state.layout.splice(index, 1);
		};

		onMounted(() => {
			state.index = state.layout.length;
		});
		return {
			state,
			itemTitle,
			removeItem,
			addItem
		};
	}
};
</script>

<style scoped>
.btn-create-widget {
	right: 1.5rem;
	bottom: 1.5rem;
}
.container-fluid {
	overflow-x: hidden;
}
</style>
