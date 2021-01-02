import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const getInitialState = () => ({
	count: 0
});

export default new Vuex.Store({
	state: getInitialState(),
	getters: {
		count: (state) => state.count
	},
	mutations: {
		increment(state) {
			state.count += 1;
		},
		reset(state) {
			Object.assign(state, getInitialState());
		}
	},
	actions: {
		reset({commit}) {
			commit('reset');
		},
		increment({commit}) {
			commit('increment');
		}
	},
	modules: {
	}
});
