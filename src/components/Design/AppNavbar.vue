<template>
	<nav class="navbar align-items-start justify-content-center bg-primary sticky-top">
		<ul class="navbar-nav pt-3 w-100">
			<li v-for="item in state.menuItems" :key="'navigation-' + item.path" class="d-flex nav-item py-2 w-100 justify-content-center">
				<router-link exact-active-class="active" :to="{name: item.path}">
					<fa-icon
						class="fa-icon"
						style="font-size: 1.8rem"
						fixed-width
						size="2x"
						:icon="item.icon" />
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
import {reactive} from '@vue/composition-api';

export default {
	name: 'AppNavbar',
	setup() {
		const state = reactive({
			menuItems: [
				{
					title: 'Home',
					path: 'Home',
					icon: [
						'fas',
						'home'
					],
					admin: false
				},
				{
					title: 'Measurements',
					path: 'About',
					icon: [
						'fas',
						'server'
					],
					admin: false
				},
				{
					title: 'Login',
					path: 'Login',
					icon: [
						'fas',
						'box'
					],
					admin: false
				}
				// {
				// title: 'Upload',
				// path: 'Uploads',
				// icon: [
				// 'fas',
				// 'home'
				// ],
				// admin: false
				// },
				// {
				// title: 'Admin page',
				// path: 'Admin',
				// icon: [
				// 'fas',
				// 'home'
				// ],
				// admin: true
				// }
			]
		});
		return {
			state
		};
	}
};
</script>

<style lang="scss" scoped>
.active .fa-icon {
	color: white!important;
}
.fa-icon {
	color: $secondary;
}
li:hover {
	cursor: pointer;
	transition: 0.3s;
	background-color: rgba(255, 255, 255, 0.1);
}
</style>
