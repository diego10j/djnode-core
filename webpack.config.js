const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.IONIC_ENV;

useDefaultConfig[env].resolve.alias = {
    "@djnode": path.resolve('./src/app/framework/'),
    "@servicios": path.resolve('./src/app/services/')
};

module.exports = function () {
    return useDefaultConfig;
};