import './main.scss';
import * as plugins from './plugins/all';
import App from './App.vue';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

new Vue({
	...plugins,
	render: (app) => app(App)
}).$mount('#app');
