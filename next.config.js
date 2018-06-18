const withCss = require('@zeit/next-css');
const withImages = require('next-images');

// fix: prevents error when .css files are required by node
if(typeof require !== 'undefined') {
	require.extensions['.css'] = (file) => {};
}

module.exports = Object.assign(
	withImages(withCss({
		webpack(config) {
			config.module.rules.push({
				test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: 'static/fonts',
						publicPath: '/_next/static/fonts'
					}
				}]
			});

			return config;
		}
	})),
	{
		distDir: '../.build' // calculated from src directiory
	}
);
