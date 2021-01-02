<template>
	<app-loading class="h-100" :loading="state.loading">
		<v-chart class="w-100 h-100" :options="state.options" autoresize />
	</app-loading>
</template>

<script>
import {onMounted, reactive} from '@vue/composition-api';
import AppLoading from './AppLoading';
import axios from '../plugins/axios';

export default {
	name: 'ChartLoader',
	components: {AppLoading},
	props: {
		transientId: {
			type: Number,
			required: true
		}
	},
	setup(props) {
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
				series: [
					{
						name: 'scatter',
						type: 'scatter',
						symbolSize: 6,
						data: []
					}
				]
			}
		});

		const distributeData = function(data) {
			state.options.title.text = data.header.name;
			state.header = data.header;
			state.options.series[0].data = data.data;
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