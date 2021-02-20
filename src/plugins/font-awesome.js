import {faBox, faHome, faPlus, faServer} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import {library} from '@fortawesome/fontawesome-svg-core';

library.add(faHome, faServer, faBox, faPlus);

// eslint-disable-next-line vue/match-component-file-name
Vue.component('fa-icon', FontAwesomeIcon);
