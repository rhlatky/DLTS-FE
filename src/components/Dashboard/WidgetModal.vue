<template>
	<div
		id="create-widget-modal"
		class="modal fade"
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Create widget</h5>
					<button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close" />
				</div>
				<div class="modal-body">
					<div class="mb-3">
						<select v-model="state.selectedWidgetType" class="form-control">
							<option disabled value="">Please select one</option>
							<option value="scatter">Scatter chart</option>
						</select>
					</div>
					<div class="mb-3">
						<select v-model="state.selectedDataType" class="form-control">
							<option disabled value="">Please select one</option>
							<option value="transients">Transient</option>
							<option value="tempscans">Tempscan</option>
							<option value="ivs">Iv</option>
							<option value="cvs">Cv</option>
						</select>
					</div>
					<div class="mb-3">
						<select v-model="state.selectedData" class="form-control" multiple>
							<option disabled value="">Please select one</option>
							<option
								v-for="(item, index) in state.dataSelection"
								:key="state.selectedDataType + index"
								:value="item">
								{{ item.name }}
							</option>
						</select>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="create-widget-modal">Cancel</button>
					<button type="button" class="btn btn-primary" @click="emitCreateWidget">
						<app-loading :loading="state.creatingWidget">
							Create
						</app-loading>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {onMounted, onUnmounted, reactive, toRefs, watchEffect} from '@vue/composition-api';
import AppLoading from '../AppLoading';
import {Modal} from 'bootstrap';

export default {
	name: 'WidgetModal',
	components: {AppLoading},
	emits: [
		'modal-closed',
		'create-widget'
	],
	props: {
		openModal: {
			type: Boolean,
			default: false
		},
		closeModal: {
			type: Boolean,
			default: false
		},
		measurementIds: {
			type: Array,
			required: true
		}
	},
	setup(props, {emit, root}) {
		let widgetModal = null;
		const {openModal, closeModal} = toRefs(props);
		const {axios} = root.$options;
		const state = reactive({
			selectedWidgetType: '',
			selectedDataType: '',
			selectedData: [],
			dataSelection: [],
			creatingWidget: false
		});

		const reset = () => {
			state.selectedWidgetType = '';
			state.selectedDataType = '';
			state.selectedData = [];
			state.dataSelection = [];
			state.creatingWidget = false;
			emit('modal-closed');
		};

		onMounted(() => {
			widgetModal = document.getElementById('create-widget-modal');
			widgetModal.addEventListener('hidden.bs.modal', reset);
		});
		onUnmounted(() => {
			widgetModal.removeEventListener('hidden.bs.modal', reset);
		});

		watchEffect(() => {
			if (openModal.value) {
				new Modal(widgetModal).show();
			}
		});
		watchEffect(() => {
			if (closeModal.value) {
				new Modal(widgetModal).hide();
			}
		});

		watchEffect(() => {
			if (props.measurementIds.length && state.selectedDataType.length) {
				axios.get(`measurement/${state.selectedDataType}`, {params: {measurementIds: props.measurementIds}})
					.then(({data}) => {
						state.dataSelection = data;
						console.log(data);
					})
					.catch(({error}) => {
						console.log(error);
					});
			}
		});

		const emitCreateWidget = () => {
			emit('create-widget', {
				type: state.selectedWidgetType,
				dataType: state.selectedDataType,
				filters: '',
				style: '',
				selected: state.selectedData.map((item) => item.id),
				filtered: [],
				widgetLayout: {}
			});
		};

		return {
			state,
			emitCreateWidget
		};
	}
};
</script>

<style scoped>

</style>
