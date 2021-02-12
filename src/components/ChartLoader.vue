<template>
	<app-loading class="h-100" :loading="state.loading">
		<v-chart class="w-100 h-100" :options="state.options" autoresize />
	</app-loading>
</template>

<script>
import {onMounted, reactive} from '@vue/composition-api';
import AppLoading from './AppLoading';

export default {
	name: 'ChartLoader',
	components: {AppLoading},
	props: {
		transientId: {
			type: Number,
			required: true
		}
	},
	setup(props, {root}) {
		const {axios} = root.$options;
		const state = reactive({
			loading: false,
			header: {},
			options: {
				type: 'scatter',
				title: {
					text: '',
					textStyle: {
						fontSize: 15
					},
					left: 'center',
					top: 15
				},
				xAxis: {
					type: 'value',
					min: (value) => value.min.toExponential(5),
					max: (value) => value.max.toExponential(5)
				},
				yAxis: {
					type: 'value',
					min: (value) => value.min.toExponential(5),
					max: (value) => value.max.toExponential(5)
				},
				dataZoom: [
					{
						type: 'slider',
						show: true
					},
					{
						type: 'inside'
					}
				],
				legend: {
				},
				series: [
					{
						name: 'Original data',
						type: 'scatter',
						symbolSize: 6,
						data: [],
						color: 'red'
					},
					{
						name: 'Fitted data',
						type: 'scatter',
						symbolSize: 6,
						data: [],
						color: 'blue'
					}
				]
			}
		});

		const distributeData = function(data) {
			state.options.title.text = data.header.name;
			state.header = data.header;
			state.options.series[0].data = data.data;
			if (data.fittedData && data.fittedData.length > 0) {
				state.options.series[1].data = data.fittedData;
			}
		};

		onMounted(() => {
			state.loading = true;
			axios.get(`data/${props.transientId}`)
				.then(({data}) => {
					distributeData(data);
				})
				.catch(() => {
					console.log('error transient not found');
				})
				.finally(() => {
					state.loading = false;
				});
		});

		return {
			state,
			distributeData
		};
	}
};
</script>

<style scoped>

</style>
