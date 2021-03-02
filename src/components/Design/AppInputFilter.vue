<template>
	<div class="w-100">
		<span class="btn btn-success badge" data-bs-open="dropdown">
			<fa-icon :icon="['fas', 'plus']" />
		</span>
		<div class="container">
			<div class="row">
				<div class="col-3 filters-column">
					<h6>Choose property</h6>
					<ul class="list-group">
						<li
							v-for="(filter, index) in state.dummyFilters"
							:key="'filter-' + index"
							class="list-group-item"
							:class="[state.selectedFilter === filter ? 'active' : '']"
							aria-current="true"
							@click="state.selectedFilter = filter">
							{{ filter }}
						</li>
					</ul>
				</div>
				<div class="col-3 filters-column">
					<h6>Choose operator</h6>
					<ul class="list-group">
						<li
							v-for="(operator, index) in state.operators"
							:key="'operator-' + index"
							class="list-group-item"
							:class="[state.selectedOperator === operator ? 'active' : '']"
							aria-current="true"
							@click="state.selectedOperator = operator">
							{{ operator }}
						</li>
					</ul>
				</div>
				<div class="col-6 filters-column">
					<h6>Choose value</h6>
					<ul class="list-group">
						<li
							v-for="(operator, index) in state.tw"
							:key="'operator-' + index"
							class="list-group-item"
							:class="[state.selectedValue === operator ? 'active' : '']"
							aria-current="true"
							@click="state.selectedValue = operator">
							{{ operator }}
						</li>
					</ul>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<button class="btn btn-success">Add</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {reactive} from '@vue/composition-api';

export default {
	name: 'AppInputFilter',
	setup() {
		const state = reactive({
			inputFilters: [],
			selectedFilter: null,
			selectedOperator: null,
			selectedValue: null,
			operators: [
				'=',
				'>',
				'<'
			],
			dummyFilters: [
				'tw',
				'temp',
				'id',
				'nieco'
			],
			tw: [
				1,
				2,
				3,
				4,
				5,
				6
			],
			temp: [
				7,
				8
			],
			id: [
				9,
				10
			],
			nieco: [
				11,
				12
			]
		});
		return {
			state
		};
	}
};
</script>

<style scoped>
.list-group-item {
	cursor: pointer;
}
.list-group-item:hover {
	cursor: pointer;
}
.filters-column {
	max-height: 300px;
	overflow-y: auto;
}
</style>
