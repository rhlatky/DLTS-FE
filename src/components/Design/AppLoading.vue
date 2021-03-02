<template>
	<div>
		<div v-if="loading" class="d-flex align-items-center justify-content-center h-100">
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		<slot v-else />
	</div>
</template>

<script>
export default {
	name: 'AppLoading',
	props: {
		loading: {
			type: Boolean,
			required: true
		}
	}
};
</script>
