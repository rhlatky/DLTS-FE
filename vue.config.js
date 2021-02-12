module.exports = {
	css: {
		loaderOptions: {
			scss: {
				prependData: `
        @import "@/styles/_variables.scss";
      `
			}
		}
	},
	transpileDependencies: [
		'vue-echarts',
		'resize-detector'
	]
};
