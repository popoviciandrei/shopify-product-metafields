const withCss = require('@zeit/next-css');
const webpack = require('webpack');

const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
module.exports = withCss({
    webpack: (config) => {
        const env = { API_KEY: apiKey };
        config.plugins.push(new webpack.DefinePlugin(env));

        return config;
    }
})