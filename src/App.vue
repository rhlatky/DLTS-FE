<template>
	<div id="app" class="d-flex">
		<app-navbar />
		<router-view />
	</div>
</template>

<style lang="scss" scoped>
.navbar {
	min-height: 100vh;
	max-height: 100vh;
	width: 56px;
}
</style>
<script>
import AppNavbar from './components/Design/AppNavbar';
export default {
	name: 'App',
	components: {AppNavbar}
};
</script>
