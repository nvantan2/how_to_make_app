// const withPurgeCss = require("next-purgecss");
require("./dotenv.config");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const customConfig = {
	publicRuntimeConfig: {
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
		API_ENDPOINT: process.env.API_ENDPOINT,
		API_TOKEN: process.env.API_TOKEN,
		EMAIL_SENDER: process.env.EMAIL_SENDER,
	},
};
const defaultConfig = {
	...customConfig,
	webpack: (config) => {
		config.node = {
			fs: "empty",
		};
		config.module.rules.push({
			test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
			use: {
				loader: "url-loader",
				options: {
					limit: 100000,
					name: "[name].[ext]",
				},
			},
		});
		return config;
	},
};
module.exports = withSass(withCSS(defaultConfig));
