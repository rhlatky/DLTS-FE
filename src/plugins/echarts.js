import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/dataZoom';

import 'echarts/lib/chart/line';
import 'echarts/lib/chart/scatter';
import 'zrender/lib/svg/svg';

import ECharts from 'vue-echarts';
import Vue from 'vue';

// eslint-disable-next-line vue/match-component-file-name
Vue.component('v-chart', ECharts);
