<template>
	<div class="hello">
		<div class="mb-3">
			<h1>{{ msg }}</h1>
			<button class="btn btn-success" @click="increment">Increase count</button>
			{{ count }}
			<button class="btn btn-danger" @click="reset">Reset</button>
		</div>
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-3 mb-3">
					<input v-model="state.transientId" min="1" type="number" class="form-control align-self-center">
				</div>
			</div>
			<button class="btn btn-primary" @click="addItem">Add an item dynamically</button>
			<div>
				<input v-model="state.draggable" type="checkbox"> Draggable
				<input v-model="state.resizable" type="checkbox"> Resizable
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
					<graph-loader :transient-id="item.transientId" />
					<span class="remove" @click="removeItem(item.i)">x</span>
				</grid-item>
			</grid-layout>
		</div>
	</div>
</template>

<script>
import {GridItem, GridLayout} from 'vue-grid-layout';
import {onMounted, reactive} from '@vue/composition-api';
import {useActions, useGetters} from 'vuex-composition-helpers';
import GraphLoader from './ChartLoader.vue';

export default {
	name: 'HelloWorld',
	components: {
		GraphLoader,
		GridLayout,
		GridItem
	},
	props: {
		msg: {
			type: String,
			default: ''
		}
	},
	// eslint-disable-next-line max-lines-per-function
	setup() {
		const state = reactive({
			transientId: 1,
			transientLoading: false,
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
				},
				{
					x: 6,
					y: 10,
					w: 6,
					h: 10,
					i: 1,
					transientId: 45,
					moved: false
				},
				{
					x: 0,
					y: 0,
					w: 6,
					h: 10,
					i: 2,
					transientId: 85,
					moved: false
				},
				{
					x: 6,
					y: 0,
					w: 6,
					h: 10,
					i: 3,
					transientId: 89,
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
				w: 2,
				h: 2,
				i: state.index,
				transientId: parseInt(state.transientId, 10)
			});
			// Increment the counter to ensure key is always unique.
			state.index += 1;
		};

		const removeItem = function(val) {
			const index = state.layout.map((item) => item.i).indexOf(val);
			state.layout.splice(index, 1);
		};

		const {count} = useGetters({
			count: 'count'
		});

		const {increment, reset} = useActions([
			'increment',
			'reset'
		]);

		onMounted(() => {
			state.index = state.layout.length;
		});
		return {
			state,
			increment,
			reset,
			count,
			itemTitle,
			removeItem,
			addItem
		};
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
