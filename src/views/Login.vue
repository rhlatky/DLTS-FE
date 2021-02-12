<template>
	<div class="d-flex container-fluid justify-content-center">
		<div class="d-flex flex-column justify-content-center align-items-center">
			<input v-model="state.username" class="form-control" placeholder="username" type="text">
			<input v-model="state.password" class="form-control" placeholder="password" type="password">
			<button class="d-flex btn btn-secondary" @click="login">Login</button>
		</div>
	</div>
</template>

<script>
import axios from '../plugins/axios';
import {reactive} from '@vue/composition-api';

export default {
	name: 'Login',
	setup() {
		const state = reactive({
			username: '',
			password: ''
		});

		const login = () => {
			axios.post('/account/login', {
				username: state.username,
				password: state.password
			})
				.then(({data}) => {
					console.log(data);
					localStorage.setItem('username', data.username);
					localStorage.setItem('token', data.token);
				})
				.catch((error) => {
					console.log(error);
					// eslint-disable-next-line no-alert
					alert(error);
				});
		};

		return {
			state,
			login
		};
	}
};
</script>

<style scoped>

</style>
