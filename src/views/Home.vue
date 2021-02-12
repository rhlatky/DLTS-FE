<template>
	<div class="d-flex flex-column container-fluid px-lg-5 justify-content-evenly">
		<div class="row flex-xxl-fill pb-xl-2 pt-xl-3">
			<div class="col-12 col-lg-6">
				<new-measurements />
			</div>
			<div class="col-12 col-lg-6">
				<new-measurements />
			</div>
		</div>
		<div class="row flex-xxl-fill pt-xl-2 pb-xl-3">
			<div class="col-12 col-lg-6">
				<new-measurements />
			</div>
			<div class="col-12 col-lg-6">
				<new-measurements />
			</div>
		</div>
	</div>
</template>

<script>
import NewMeasurements from '../components/Home/NewMeasurements';

export default {
	name: 'Home',
	components: {NewMeasurements}
};
</script>
