import axios from 'axios';

let appConfig = null;
axios({
	url: '/config.json',
	baseURL: '/'
}).then(({data}) => {
	appConfig = data;
});

const baseUrl = (instance) => {
	instance.interceptors.request.use(
		(config) => {
			if (!config.baseURL && appConfig && appConfig.apiBaseUrl) {
				config.baseURL = appConfig.apiBaseUrl;
			}
			return config;
		},
		(err) => Promise.reject(err)
	);
};

const auth = (instance) => {
	instance.interceptors.request.use(
		(config) => {
			if (appConfig && appConfig.authorizationHeaderName && localStorage.getItem('token')) {
				const tokenType = appConfig.authorizationTokenType ? `${appConfig.authorizationTokenType} ` : '';
				config.headers[appConfig.authorizationHeaderName] = `${tokenType}${localStorage.getItem('token')}`;
			}
			return config;
		},
		(err) => Promise.reject(err)
	);
};

baseUrl(axios);
auth(axios);

export default axios;
