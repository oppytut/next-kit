const withCss = require('@zeit/next-css');

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
	require.extensions['.css'] = (file) => {};
}

module.exports = Object.assign(
	withCss(),
	{
		distDir: '../.build', // calculated from src directiory
	},
);
